import Gutter from '../../../../../components/Gutter'
import Tabs from './Tabs'
import { useSelector } from 'react-redux'
import { TABS } from '../../../../utils/tabs.util'
import { memo } from 'react'

const GameNavigation = () => {
  const { gameTab } = useSelector((state) => state.tour)

  return (
    <>
      <section className="hidden lg:block">
        <Gutter>
          {gameTab === TABS.GameProfile && <Tabs />}
          {gameTab === TABS.Transfer && <Tabs />}
        </Gutter>
      </section>
      <section className="block lg:hidden">
        {gameTab === TABS.GameProfile && <Tabs />}
        {gameTab === TABS.Transfer && <Tabs />}
      </section>
    </>
  )
}

export default memo(GameNavigation)
