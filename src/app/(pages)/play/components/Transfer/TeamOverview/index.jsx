import TeamMaxTransfers from './TeamMaxTransfers'
import TeamPrice from './TeamPrice'
import TeamBalance from './TeamBalance'
import TeamMaxClubMembers from './TeamMaxClubMembers'

const TeamOverview = () => {
  return (
    <section className="flex flex-wrap justify-evenly gap-y-0.5 px-2 pb-1 text-neutral-50 transition-all hover:border-opacity-100 sm:justify-between sm:px-0 md:gap-0">
      <TeamPrice />
      <TeamBalance />
      <TeamMaxTransfers />
      <TeamMaxClubMembers />
    </section>
  )
}

export default TeamOverview
