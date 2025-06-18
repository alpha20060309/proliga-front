'use client'
import Gutter from 'shared/Gutter'
import TopTeams from './components/TopTeams'
import { Card, CardContent } from '@/components/ui/card'

export default function SidePagesTemplate({ children }) {
  return (
    <Gutter>
      <section className="flex w-full flex-col gap-2 lg:flex-row">
        {/* <div className="bg-background text-foreground xs:px-3 flex h-full min-h-160 w-full flex-1 table-auto flex-col overflow-x-auto rounded-xl px-2 py-4 lg:w-2/3 lg:px-4"> */}
        <Card className={'border-border h-full overflow-x-auto'}>
          <CardContent>{children}</CardContent>
        </Card>
        {/* </div> */}
        <TopTeams />
      </section>
    </Gutter>
  )
}
