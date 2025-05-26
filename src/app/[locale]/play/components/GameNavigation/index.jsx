import Gutter from '../../../../../components/Gutter'
import Tabs from './Tabs'
import { useSelector } from 'react-redux'
import { TABS } from '../../../../utils/tabs.util'
import { memo } from 'react'

const GameNavigation = () => {
  const { gameTab } = useSelector((state) => state.tour)

  return (
    <>
      <section className="animate-in fade-in-0 hidden w-full duration-500 lg:block">
        <Gutter>
          {gameTab === TABS.GameProfile && <Tabs />}
          {gameTab === TABS.Transfer && <Tabs />}
        </Gutter>
      </section>
      <section className="animate-in fade-in-0 block w-full duration-500 lg:hidden">
        {gameTab === TABS.GameProfile && <Tabs />}
        {gameTab === TABS.Transfer && <Tabs />}
      </section>
    </>
  )
}

export default memo(GameNavigation)
