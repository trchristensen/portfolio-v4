import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import NewsletterForm from '@/components/NewsletterForm'
import { getFileBySlug } from '@/lib/mdx'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import projectsData from '@/data/projectsData'
import CompactCard from '@/components/CompactCard'
import workData from '@/data/workData'

const MAX_DISPLAY = 5
const DEFAULT_LAYOUT = 'AuthorLayout.Home'

export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
  authorDetails
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', ['default'])
  const { mdxSource, frontMatter } = authorDetails

  return { props: { posts, authorDetails: { mdxSource, frontMatter } } }
}

export default function Home({
  posts,
  authorDetails: { mdxSource, frontMatter },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div>
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
        />
        <div className="mt-8 space-y-2 pt-6 pb-8 md:space-y-5">
          <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            Latest Posts
          </h2>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}

      <div className="mt-8 space-y-2 pt-6 pb-8 md:space-y-5">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Latest Projects
        </h2>
      </div>
      <ul className="mb-12">
        {projectsData.length &&
          projectsData.slice(0, MAX_DISPLAY).map((project, idx) => {
            return (
              <li className="-mb-4" key={idx}>
                {/* <ProjectCard {...project} /> */}
                <CompactCard
                  title={project.title}
                  description={project.description}
                  href={project.href}
                  imgSrc={null}
                />
              </li>
            )
          })}
      </ul>
      {projectsData.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/projects"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all projects"
          >
            All Projects &rarr;
          </Link>
        </div>
      )}
      <div className="mt-8 space-y-2 pt-6 md:space-y-5">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Work
        </h2>
      </div>
      <Work />

      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

const Work = () => {
  return (
    <div className="mb-8 flex flex-col space-y-3 py-12">
      {workData.map((job, idx) => (
        <a
          key={idx}
          target="_blank"
          rel="noopener noreferrer"
          href={job.companySite}
          className="group flex items-center space-x-4"
        >
          <span className="group-hover:text-accent flex-none font-medium group-hover:underline">
            {job.company}
          </span>
          <span className="border-base-content w-full flex-shrink border-t border-dashed"></span>
          <span className="text-tertiary flex-none">{job.jobTitle}</span>
          <span className="text-quaternary flex-none font-mono">{job.dates}</span>
        </a>
      ))}
    </div>
  )
}
