import PlayersStructure from './PlayersStructure'
import PlayersTable from './PlayersTable'
import TransferStadiumForm from './TransferStadiumForm'
import PlayerTransfer from 'components/Modals/PlayerTransfer'
import StadiumContainer from 'components/StadiumContainer'
import { memo } from 'react'

const Transfer = () => {
  return (
    <>
      <main className="flex w-full flex-col justify-between gap-1 lg:flex-row">
        <div className="mt-0.5 flex h-auto grow flex-col lg:w-1/2 xl:grow-0 2xl:max-w-lg">
          <StadiumContainer hideShareButton>
            <PlayersStructure />
          </StadiumContainer>
          <TransferStadiumForm />
        </div>
        <PlayersTable />
      </main>
      <PlayerTransfer />
    </>
  )
}

export default memo(Transfer)
