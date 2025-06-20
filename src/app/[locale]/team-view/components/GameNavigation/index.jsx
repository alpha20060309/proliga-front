import Tabs from './TourTabs'

const TeamTabs = () => {
  return (
    <>
      <section className="animate-in fade-in-0 relative mx-auto hidden w-full flex-1 duration-500 lg:block">
        <Tabs />
      </section>
      <section className="animate-in fade-in-0 block w-full duration-500 lg:hidden">
        <Tabs />
      </section>
    </>
  )
}

export default TeamTabs
