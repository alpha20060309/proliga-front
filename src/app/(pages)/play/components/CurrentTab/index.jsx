'use client'

import GameProfile from '../GameProfile'
import Statistics from '../Statistics'
import Transfer from '../Transfer'
import Journal from '../Journal'
import ModalBanner from 'components/Banners/Modal'
import LeftSideBanner from 'components/Banners/LeftSide'
import Tournament from '../Tournament'
import SidePagesTemplate from '../SidePagesTemplate/template'
import RightSideBanner from 'components/Banners/RightSide'
import { TABS } from '../../../../utils/tabs.util'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopTeams } from 'app/lib/features/team/team.thunk'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'

const CurrentTab = ({ currentTab }) => {
  const dispatch = useDispatch()
  const currentCompetition = useSelector(selectCurrentCompetition)
  const [isModalOpen, setModalOpen] = useState(true)

  const renderCurrentTab = () => {
    switch (currentTab) {
      case TABS.GameProfile:
        return <GameProfile />
      case TABS.Transfer:
        return <Transfer />
      case TABS.Statistics:
        return (
          <SidePagesTemplate>
            <Statistics />
          </SidePagesTemplate>
        )
      case TABS.Journal:
        return (
          <SidePagesTemplate>
            <Journal />
          </SidePagesTemplate>
        )
      case TABS.Tournament:
        return (
          <SidePagesTemplate>
            <Tournament />
          </SidePagesTemplate>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    if (currentCompetition?.id) {
      dispatch(
        fetchTopTeams({
          competition_id: currentCompetition?.id,
        })
      )
    }
  }, [currentCompetition?.id, dispatch])

  return (
    <div className="flex gap-1">
      <LeftSideBanner />
      {renderCurrentTab()}
      <RightSideBanner />
      <ModalBanner isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}

export default CurrentTab
