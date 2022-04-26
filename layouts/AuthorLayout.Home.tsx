import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import { ReactNode } from 'react'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

interface Props {
  children: ReactNode
  frontMatter: AuthorFrontMatter
}

export default function AuthorLayout({ children, frontMatter }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, excerpt, resume } =
    frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5"></div>
        <div className="flex flex-col-reverse items-start sm:flex-row">
          <div className="flex flex-col items-start space-x-2 pt-8">
            <h1 className="text-primary mb-1 text-3xl font-bold tracking-tight md:text-5xl">
              {name}
            </h1>
            {/* <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3> */}
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {company}
              <div className="mx-2 inline-block h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon size={6} kind="mail" href={`mailto:${email}`} />
              <SocialIcon size={6} kind="github" href={github} />
              <SocialIcon size={6} kind="linkedin" href={linkedin} />
              <SocialIcon size={6} kind="twitter" href={twitter} />
              <SocialIcon size={6} kind="resume" href={resume} />
            </div>
            <div className="prose max-w-lg pt-8 pb-8 dark:prose-dark xl:col-span-2">{excerpt}</div>
          </div>
          <div>
            <Image
              src={avatar}
              alt="avatar"
              width="192px"
              height="192px"
              className="h-48 w-48 rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  )
}
