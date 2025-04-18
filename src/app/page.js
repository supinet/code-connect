/**
 * the main advantage of use next is that is needed to declare
 * useFunctions given the empty array than when the component
 * be ready e request and mount the screen.
 * On the next the things works different. When the page request
 * is made, the Next Server will make this request to server and
 * will mount the screen and return to the browser.
 * On this next version the only needs to annotate the function witn
 * "async". Will can see it on line 31.
 */
import { CardPost } from "@/components/CardPost";
import logger from "@/logger"
import styles from "./page.module.css"
import Link from "next/link";
import prisma from "../../prisma/prisma";

async function getAllPosts(page, searchTerm) {
  try {
    const where = {};
    if (searchTerm) {
      where.title = {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }
    const perPage = 4;
    const skip = (page - 1) * perPage;
    const totalItems = await prisma.post.count({ where });
    const totalPages = Math.ceil(totalItems / perPage);
    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    const posts = await prisma.post.findMany({
      take: perPage,
      skip,
      where,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        author: true
      }
    });
    return { data: posts, prev, next }
  } catch(error) {
    logger.error(`Error getting posts ${error}`)
    return { data: [], prev: null, next: null }
  }
}

/**
 * using async to activate Next Server Rendering 
 */
export default async function Home({ searchParams }) {
  const param = await searchParams;
  const searchTerm = param?.q;
  const currentPage = await parseInt(param?.page || 1);
  const { data: posts, prev, next } = await getAllPosts(currentPage, searchTerm);
  return (
      <main className={styles.grid}>
        {posts?.map(post => 
          <
            CardPost
            key={post.id}
            post={post}
          />
        )}
        <div className={styles.links}>
          {prev && <Link href={ { pathname: '/', query: {  page: prev, q: searchTerm }}}>Previous page</Link>}
          {next && <Link href={ { pathname: '/', query: {  page: next, q: searchTerm }}}>Next page</Link>}
        </div>
      </main>
  );
}
