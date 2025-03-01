import YandexAd from '../YandexAd'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { BANNER, BANNER_SERVICE_TYPE } from 'app/utils/banner.util'
import { useMemo, useState, useEffect, memo } from 'react'
import { useCreateBannerView } from 'app/hooks/system/useCreateBannerView/useCreateBannerView'
import {
  selectAgent,
  selectGeo,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { selectBanners } from 'app/lib/features/banner/banner.selector'
import { getUrl } from 'app/utils/static.util'

const LeftSideBanner = () => {
  const banners = useSelector(selectBanners)
  const agent = useSelector(selectAgent)
  const userTable = useSelector(selectUserTable)
  const geo = useSelector(selectGeo)
  const NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH =
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH
  const { createBannerView } = useCreateBannerView()

  const banner = useMemo(
    () => banners.find((b) => b?.banner_type === BANNER.SIDE_BANNER_LEFT),
    [banners]
  )
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    if (
      windowWidth >= NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH &&
      banner?.type === BANNER_SERVICE_TYPE.CUSTOM
    ) {
      if (banner?.id && userTable?.id && geo && agent) {
        createBannerView({
          banner_id: banner?.id,
          userTable,
          geo,
          agent,
        })
      }
    }
  }, [
    banner,
    NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH,
    windowWidth,
    agent,
    userTable,
    geo,
    createBannerView,
  ])

  return (
    <>
      {windowWidth >= NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH &&
        banner?.type === BANNER_SERVICE_TYPE.CUSTOM && (
          <Link
            href={banner?.link ?? ''}
            className="mb-auto hidden h-[560px] w-[160px] min-w-[160px] overflow-hidden rounded-sm lg:block"
          >
            <img
              src={getUrl(banner?.content_url) ?? ''}
              alt={banner?.name}
              loading="lazy"
              className="h-full w-full"
            />
          </Link>
        )}
      {windowWidth >= NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH &&
        banner?.type === BANNER_SERVICE_TYPE.YANDEX && (
          <div className="mb-auto hidden h-[560px] w-[160px] min-w-[160px] overflow-hidden rounded-sm lg:block">
            <YandexAd blockId={banner?.service_id} />
          </div>
        )}
    </>
  )
}

export default memo(LeftSideBanner)
