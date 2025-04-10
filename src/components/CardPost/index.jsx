import Image from "next/image"
import { Avatar } from "../Avatar"
import styles from './card.module.css'
import Link from "next/link"

export const CardPost = ({ post, highlight }) => {
    return(
        <Link href={`/posts/${post.slug}`} className={styles.card}>
            <article className={styles.card} style={{ width: highlight ? 9993 : 486 }}>
                <header className={styles.header}>
                    <figure style={{ height: highlight ? 300 : 133 }}>
                        <Image
                            src={post.cover}
                            width={438}
                            height={133}
                            alt={`post cover ${post.title}`}
                        />
                    </figure>
                </header>
                <section className={styles.body}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </section>
                <footer className={styles.footer}>
                    <Avatar
                        imageSrc={post.author.avatar}
                        name={post.author.username}
                    />
                </footer>
            </article>
        </Link>
    )
}