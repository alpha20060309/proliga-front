import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const SoccerBallAnimation = () => {
  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFilled((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full w-full rounded bg-gradient-to-br from-green-800 to-green-600 xl:rotate-90">
      {/* Field patterns */}
      <div className="absolute inset-0">
        {/* Outer field border */}
        <div className="absolute inset-8 rounded-md border-2 border-white/30" />

        {/* Center circle */}
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white/30" />

        {/* Center line */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-white/30" />

        {/* Penalty areas */}
        <div className="absolute left-8 right-8 top-8 h-48 border-2 border-white/30" />
        <div className="absolute bottom-8 left-8 right-8 h-48 border-2 border-white/30" />

        {/* Goal areas */}
        <div className="absolute left-32 right-32 top-8 h-24 border-2 border-white/30" />
        <div className="absolute bottom-8 left-32 right-32 h-24 border-2 border-white/30" />

        {/* Corner arcs */}
        <div className="absolute left-8 top-8 h-16 w-16 rounded-br-full border-r-2 border-white/30" />
        <div className="absolute right-8 top-8 h-16 w-16 rounded-bl-full border-l-2 border-white/30" />
        <div className="absolute bottom-8 left-8 h-16 w-16 rounded-tr-full border-r-2 border-white/30" />
        <div className="text-pr absolute bottom-8 right-8 h-16 w-16 rounded-tl-full border-l-2 border-white/30" />
      </div>

      {/* Soccer ball animation */}
      <motion.div
        className="absolute left-[calc(50%-60px)] top-[calc(50%-60px)]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          <motion.path
            d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM12.7825 10.7137H10.6813L10.1025 9.91625L10.8919 7.6175L11.8294 7.31187L13.4694 8.57C13.3917 9.32452 13.1578 10.0546 12.7825 10.7137ZM2.5325 8.57L4.16938 7.3125L5.10688 7.61812L5.89625 9.91687L5.31875 10.7137H3.2175C2.84175 10.0547 2.6074 9.32461 2.52938 8.57H2.5325ZM3.1575 5.405L3.50188 6.5675L2.54438 7.29812C2.62923 6.6352 2.83514 5.99351 3.15188 5.405H3.1575ZM6.8125 9.5L6.09625 7.41563L8 6.10687L9.90375 7.41563L9.1875 9.5H6.8125ZM12.5044 6.5675L12.8488 5.405C13.1655 5.99351 13.3714 6.6352 13.4563 7.29812L12.5044 6.5675ZM12.1169 4.35625L11.5225 6.36125L10.5806 6.66687L8.5 5.23688V4.26312L10.3181 3.01312C11.0029 3.3334 11.6148 3.7905 12.1163 4.35625H12.1169ZM9.12938 2.61687L8 3.39313L6.87063 2.61687C7.61547 2.46097 8.38453 2.46097 9.12938 2.61687ZM5.68188 3.01312L7.5 4.26312V5.23688L5.42 6.66687L4.47813 6.36125L3.88375 4.35625C4.38516 3.7905 4.99711 3.3334 5.68188 3.01312ZM3.94688 11.7137H5.22L5.66813 12.9806C5.01739 12.6744 4.4327 12.244 3.94688 11.7137ZM6.875 13.3831L6.1325 11.2944L6.70938 10.5H9.29063L9.8675 11.2944L9.12813 13.3831C8.38413 13.539 7.61588 13.539 6.87188 13.3831H6.875ZM10.335 12.9806L10.7831 11.7137H12.0563C11.5695 12.2444 10.9837 12.6747 10.3319 12.9806H10.335Z"
            animate={{
              fill: isFilled ? '#fff400' : '#fafafa',
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
          />
        </svg>
      </motion.div>
    </div>
  )
}
