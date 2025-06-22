'use client'
import Gutter from 'shared/Gutter'
import TopTeams from './components/TopTeams'
import { Card, CardContent } from '@/components/ui/card'
import BannerTemplate from 'app/[locale]/play/components/BannerTemplate'

export default function TeamPagesLayout({ children }) {
  return (
    <Gutter mobileFriendly>
      <BannerTemplate>
        <section className="flex w-full flex-col gap-2 lg:flex-row">
          <Card
            className={'border-border h-full w-full overflow-x-auto lg:w-2/3'}
          >
            <CardContent
              className={
                'flex h-[38rem] flex-col justify-between gap-2 px-4 lg:h-full xl:h-[38rem]'
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
