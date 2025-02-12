import { DialogTitle } from '@radix-ui/react-dialog'
import { staticPath, getUrl } from 'app/utils/static.util'
import { User, DollarSign, Percent } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { useSelector } from 'react-redux'

const PlayerPhoto = ({ currentPlayer, position }) => {
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)
  const image = staticPath + '/player-png/' + currentPlayer?.slug + '/app.png'
  const club =
    staticPath + '/club-jpeg/' + currentPlayer?.club?.slug + '/logo.jpeg'

  return (
    <section className="flex gap-2">
      <div className="size-24 flex-shrink-0 sm:size-32 lg:size-36">
        <img
          src={getUrl(image) || ''}
          alt="player image"
          loading="lazy"
          onError={(e) =>
            (e.currentTarget.src = '/images/placeholder-user.png')
          }
          className="h-full w-full rounded-lg object-cover object-center shadow-md"
        />
      </div>
      <section className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <DialogTitle className="mb-1 truncate text-lg font-bold text-primary sm:text-xl md:text-2xl">
            {getCorrectName({
              lang,
              uz: currentPlayer?.name,
              ru: currentPlayer?.name_ru,
            })}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <img
              src={getUrl(club) || ''}
              alt="home club"
              width={20}
              height={20}
              draggable={false}
              loading="lazy"
              onError={(e) => (e.currentTarget.src = '/icons/football.svg')}
              className="size-5 rounded-full bg-neutral-700 md:size-6 lg:size-7"
            />
            <p className="text-sm font-medium text-neutral-200 md:text-base">
              {getCorrectName({
                lang,
                uz: currentPlayer?.club?.name,
                ru: currentPlayer?.club?.name_ru,
              })}
            </p>
            <span className="text-neutral-500">|</span>
            <p className="text-sm text-neutral-300 md:text-base">{position}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 sm:hidden">
          <SmallerStat
            icon={<DollarSign className="size-4" />}
            value={currentPlayer?.price}
            label={t('Narx')}
          />
          <SmallerStat
            icn={<User className="size-4" />}
            value={currentPlayer?.point}
            label={t('Ochko')}
          />
          <SmallerStat
            icon={<Percent className="size-4" />}
            value={`${currentPlayer?.percentage}%`}
            label={t('Sotib Olgan')}
          />
        </div>
        <div className="hidden grid-cols-3 gap-2 sm:grid">
          <Stat
            icon={<DollarSign className="size-4" />}
            value={currentPlayer?.price}
            label={t('Narx')}
          />
          <Stat
            icon={<User className="size-4" />}
            value={currentPlayer?.point}
            label={t('Ochko')}
          />
          <Stat
            icon={<Percent className="size-4" />}
            value={`${currentPlayer?.percentage}%`}
            label={t('Sotib Olgan')}
          />
        </div>
      </section>
    </section>
  )
}

const Stat = ({ icon, value, label }) => (
  <div className="flex items-center gap-1.5 rounded-md bg-neutral-800 p-1.5 text-xs sm:p-2 sm:text-sm">
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-700 sm:h-7 sm:w-7">
      {icon}
    </div>
    <div>
      <p className="font-semibold text-neutral-100">{value ?? 0}</p>
      <p className="text-xs text-neutral-400">{label}</p>
    </div>
  </div>
)

const SmallerStat = ({ value, label }) => (
  <div className="flex items-center justify-between gap-1 rounded-md bg-neutral-800 px-2 py-1 text-xs xs:py-2">
    <p className="text-[10px] leading-tight text-neutral-400">{label}</p>
    <p className="font-semibold leading-tight text-neutral-100">{value ?? 0}</p>
  </div>
)

export default PlayerPhoto
