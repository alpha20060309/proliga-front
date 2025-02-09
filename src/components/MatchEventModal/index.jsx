'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useDispatch, useSelector } from 'react-redux'
import { setMatchModalOpen } from 'app/lib/features/matches/matches.slice'
import { selectCurrentMatch } from 'app/lib/features/matches/matches.selector'
import MatchEventHeader from './Header'
import MatchEventScore from './Score'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCcw } from 'lucide-react'
import { refreshButtonVariants } from './animations.styles'
import { useEffect } from 'react'
import { fetchMatchEvents } from 'app/lib/features/matchEvent/matchEvent.thunk'
import MatchEventContent from './Content'
import { memo } from 'react'

function MatchEventModal() {
  const dispatch = useDispatch()
  const { isModalOpen } = useSelector((store) => store.matches)
  const currentMatch = useSelector(selectCurrentMatch)

  const setModalOpen = () => {
    dispatch(setMatchModalOpen(false))
  }

  useEffect(() => {
    if (isModalOpen && currentMatch?.id) {
      dispatch(fetchMatchEvents({ match_id: currentMatch?.id }))
    }
  }, [dispatch, isModalOpen, currentMatch])

  const handleRefresh = () => {
    if (isModalOpen && currentMatch?.id) {
      dispatch(fetchMatchEvents({ match_id: currentMatch?.id }))
    }
  }

  return (
    <Dialog open={isModalOpen && currentMatch?.id} onOpenChange={setModalOpen}>
      <DialogContent className="flex h-[75vh] max-w-2xl flex-col gap-0 rounded-xl border border-neutral-800 bg-gradient-to-b from-gray-900 via-neutral-950 to-black p-0 text-white">
        <MatchEventHeader
          started_date={currentMatch?.started_date}
          finished_date={currentMatch?.finished_date}
        />
        <DialogDescription className="hidden"></DialogDescription>
        <MatchEventScore />
        <MatchEventContent />
        <AnimatePresence>
          {isModalOpen && (
            <motion.button
              className="absolute bottom-4 right-6 rounded-full bg-gray-800 p-2 text-white shadow shadow-neutral-400"
              variants={refreshButtonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              whileTap="tap"
              onClick={handleRefresh}
            >
              <RefreshCcw className="size-5 text-neutral-50" />
            </motion.button>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

export default memo(MatchEventModal)
