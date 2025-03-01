'use client'

import YandexAd from '../YandexAd'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useMemo, useEffect, memo } from 'react'
import { BANNER, BANNER_SERVICE_TYPE } from 'app/utils/banner.util'
import { useCreateBannerView } from 'app/hooks/system/useCreateBannerView/useCreateBannerView'
import {
  selectAgent,
  selectGeo,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { selectBanners } from 'app/lib/features/banner/banner.selector'
import { getUrl } from 'app/utils/static.util'

const BigBanner = () => {
  const banners = useSelector(selectBanners)
  const agent = useSelector(selectAgent)
  const userTable = useSelector(selectUserTable)
  const geo = useSelector(selectGeo)
  const { createBannerView } = useCreateBannerView()

  const banner = useMemo(
    () => banners.find((b) => b?.banner_type === BANNER.BIG_BANNER),
    [banners]
  )

  useEffect(() => {
    if (banner?.type === BANNER_SERVICE_TYPE.CUSTOM) {
      if (banner?.id && userTable?.id && geo && agent) {
        createBannerView({
          banner_id: banner?.id,
          userTable,
          geo,
          agent,
        })
      }
    }
  }, [banner, agent, userTable, geo, createBannerView])

  return (
    <>
      {banner?.type === BANNER_SERVICE_TYPE.CUSTOM && (
        <Link
          href={banner?.link ?? ''}
          className="block h-[480px] w-[360px] overflow-hidden rounded"
        >
          <img
            src={getUrl(banner?.content_url) ?? ''}
            alt={banner?.name}
            loading="lazy"
            className="h-full w-full rounded"
          />
        </Link>
      )}
      {banner?.type === BANNER_SERVICE_TYPE.YANDEX && (
        <div className="block max-h-[700px] max-w-[360px] overflow-hidden rounded">
          <YandexAd blockId={banner?.service_id} />
        </div>
      )}
    </>
  )
}

export default memo(BigBanner)
