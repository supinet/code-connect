import logger from "@/logger"
import { remark } from 'remark'
import { html } from 'remark-html'

async function getPostBySlug(slug) {
    const url = `http://localhost:3042/posts?slug=${slug}`
    const response = await fetch(url)
    if (!response.ok) {
        logger.error(`error ${response.status}`)
        return {}
    }
    logger.info(`Posts gotten success`)
    const data = await response.json();
    if (data.length === 0)
        return {}
    
    const post =  data[0];

    const processedContent = await remark()
        .use(html)
        .process(post.markdown);
    const contentHtml = processedContent.toString();
    post.markdown = contentHtml
    return await post;
} 

const PagePost = async ({ params }) => {
    const param = await params;
    const post = await getPostBySlug(param.slug)
    return (<>
        <h1 style={{ color: 'white' }}>{post.title}</h1>
        <div
            style={{ padding: 16, background: 'white' }}
            dangerouslySetInnerHTML = {{ __html: post.markdown }}
        />
    </>)
}

export default PagePost