'use client'
import Gutter from 'components/Gutter'
import TopTeams from './components/TopTeams'
import { Card, CardContent } from '@/components/ui/card'
import BannerTemplate from 'app/[locale]/play/components/BannerTemplate'

export default function TeamPagesLayout({ children }) {
  return (
    <Gutter mobileFriendly>
      <BannerTemplate>
        <section className="flex w-full flex-col gap-2 lg:flex-row max-w-2xl lg:max-w-none mx-auto lg:mx-0">
          <Card
            className={'border-border h-full w-full overflow-x-auto lg:w-2/3'}
          >
            <CardContent
              className={
                'flex min-h-[32rem] lg:min-h-[36rem] 2xl:min-h-[40rem] flex-col justify-between gap-2 px-4 h-full '
              }
            >
              {children}
            </CardContent>
          </Card>
          <TopTeams />
        </section>
      </BannerTemplate>
    </Gutter>
  )
}
