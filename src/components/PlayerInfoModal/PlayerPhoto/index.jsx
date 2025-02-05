import { DialogTitle } from '@radix-ui/react-dialog'
import { staticPath } from 'app/utils/static.util'
import { getUrl } from 'app/utils/static.util'

const PlayerPhoto = ({ currentPlayer, position }) => {
  const image = staticPath + '/player-png/' + currentPlayer?.slug + '/app.png'
  const club =
    staticPath + '/club-jpeg/' + currentPlayer?.club?.slug + '/logo.jpeg'

  return (
    <DialogTitle className="flex gap-2 md:gap-4">
      <img
        src={getUrl(image) || ''}
        alt="player image"
        loading="lazy"
        width={24}
        height={24}
        onError={(e) => (e.target.src = '/images/placeholder-user.png')}
        className="h-full w-full max-w-14 rounded-md md:max-w-20 xl:max-w-36"
      />
      <div className="flex flex-col flex-wrap gap-1">
        <h3 className="max-w-56 truncate text-base font-bold sm:max-w-64 md:max-w-80 md:text-lg xl:max-w-96 xl:text-xl">
          {currentPlayer?.name}
        </h3>
        <div className="flex items-center gap-2 text-neutral-100">
          <img
            src={getUrl(club) || ''}
            alt="home club"
            width={48}
            height={48}
            draggable={false}
            loading="lazy"
            onError={(e) => (e.target.src = '/icons/football.svg')}
            className="h-full w-6 select-none rounded-full bg-neutral-400 md:w-8"
          />
          <p className="text-neutral-300">{currentPlayer?.club?.name}</p>
          <span>|</span>
          <p className="truncate text-sm md:text-base">{position}</p>
        </div>
      </div>
    </DialogTitle>
  )
}

export default PlayerPhoto
