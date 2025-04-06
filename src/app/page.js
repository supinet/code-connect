/**
 * the main advantage of use next is that is needed to declare
 * useFunctions given the empty array than when the component
 * be ready e request and mount the screen.
 * On the next the things works different. When the page request
 * is made, the Next Server will make this request to server and
 * will mount the screen and return to the browser.
 * On this next version the only needs to annotate the function witn
 * "async". Will can see it on line 29.
 */
import { CardPost } from "@/components/CardPost";
import logger from "@/logger"
import styles from "./page.module.css"

async function getAllPosts() {
  return await fetch('http://localhost:3042/posts')
    .then(res => {
      if (!res.ok)
        throw new Error(`Error fetch ${res.status}`);
      return res.json();
    })
    .catch(error => {
      logger.error(`error ${error}`)
    });
}

/**
 * using async to activate Next Server Rendering 
 */
export default async function Home() {

  const posts = await getAllPosts();
  return (
      <main className={styles.grid}>
        {posts?.map(post => 
          <
            CardPost
            key={post.id}
            post={post}
          />
        )}
      </main>
  );
}
