import dynamic from 'next/dynamic'
import TopTeamsSkeleton from '../TopTeams/Skeleton'
const TopTeams = dynamic(() => import('../TopTeams'), {
  loading: () => <TopTeamsSkeleton />,
})

const SidePagesTemplate = ({ children }) => {
  return (
    <section className="flex w-full flex-col gap-2 lg:flex-row">
      <div className="bg-background text-secondary-foreground xs:px-3 flex h-full min-h-160 w-full flex-1 table-auto flex-col overflow-x-auto rounded-xl px-2 py-4 lg:w-2/3 lg:px-4">
        {children}
      </div>
      <TopTeams />
    </section>
  )
}

export default SidePagesTemplate
