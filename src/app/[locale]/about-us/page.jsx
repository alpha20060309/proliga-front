import Gutter from 'components/Gutter'
import { getHTMLPage } from 'app/actions/get-html-page.action'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const AboutUs = async ({ params }) => {
  const { locale } = await params
  const { data, error } = await getHTMLPage('about-us')

  if (error) {
    return <Gutter>{error?.message}</Gutter>
  }

  return (
    <Gutter>
      <div
        className="html-page shadow-muted bg-card my-6 min-h-[40vh] w-full rounded-xl px-2 py-4 text-sm shadow-md sm:p-4 md:p-6 xl:text-base"
        dangerouslySetInnerHTML={{
          __html: getCorrectName({ lang: locale, ru: data?.ru, uz: data?.uz }),
        }}
      />
    </Gutter>
  )
}

export default AboutUs
