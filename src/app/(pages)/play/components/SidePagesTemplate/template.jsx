import dynamic from 'next/dynamic'
import TopTeamsSkeleton from '../TopTeams/Skeleton'
const TopTeams = dynamic(() => import('../TopTeams'), {
  loading: () => <TopTeamsSkeleton />,
})

const SidePagesTemplate = ({ children }) => {
  return (
    <section className="flex w-full flex-col gap-2 lg:flex-row">
      <div className="flex h-full min-h-[40rem] w-full flex-1 table-auto flex-col overflow-x-auto rounded-xl bg-black px-2 py-4 text-neutral-200 xs:px-3 lg:w-2/3 lg:px-4">
        {children}
      </div>
      <TopTeams />
    </section>
  )
}

export default SidePagesTemplate
