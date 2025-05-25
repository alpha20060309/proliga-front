import Tabs from './TourTabs'
import { motion } from 'framer-motion'

const TeamTabs = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto hidden w-full max-w-2xl flex-1 lg:block"
      >
        <Tabs />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="block w-full lg:hidden"
      >
        <Tabs />
      </motion.div>
    </>
  )
}

export default TeamTabs
