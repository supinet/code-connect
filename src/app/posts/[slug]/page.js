import logger from "@/logger"
import { remark } from 'remark'
import { html } from 'remark-html'
import { CardPost } from "@/components/CardPost"
import styles from './page.module.css'
import prisma from "../../../../prisma/prisma"
import { redirect } from "next/navigation"

async function getPostBySlug(slug) {

    try {
        const post = await prisma.post.findFirst({
            where: {
                slug  
            },
            include: {
                author: true
            }
        })

        if (!post)
            throw new Error(`Post com o slug ${slug} not found!`);

        const processedContent = await remark()
            .use(html)
            .process(post.markdown);
        const contentHtml = processedContent.toString();
        post.markdown = contentHtml
        return await post;
    } catch (error) {
        logger.error('Fail to get post with slug', {
            slug,
            error
        })
    }
    redirect('/not-found');
} 

const PagePost = async ({ params }) => {
    const param = await params;
    const post = await getPostBySlug(param.slug)
    return (<div>
        <CardPost post={post} highlight />
        <h3 className={styles.subtitle}>Source:</h3>
        <div className={styles.code}>
            <div dangerouslySetInnerHTML = {{ __html: post.markdown }} />
        </div>
    </div>)
}

export default PagePost