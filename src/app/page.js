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

async function getAllPosts(page) {
  const response = await fetch(`http://localhost:3042/posts/?_page=${page}&_per_page=6`)
    if (!response.ok) {
      logger.error(`Error fetch ${response.status}`);
      return [];
    }
    logger.info(`Posts gotten success`);
    return response.json();
}

/**
 * using async to activate Next Server Rendering 
 */
export default async function Home({ searchParams }) {
  const param = await searchParams;
  const currentPage = await param?.page || 1;
  const { data: posts, prev, next } = await getAllPosts(currentPage);
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
          {prev && <Link href={`/?page=${prev}`}>Previous page</Link>}
          {next && <Link href={`/?page=${next}`}>Next page</Link>}
        </div>
      </main>
  );
}
