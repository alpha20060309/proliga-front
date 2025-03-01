'use client'

import Link from 'next/link'
import { useSelector } from 'react-redux'
import { BANNER, BANNER_SERVICE_TYPE } from 'app/utils/banner.util'
import { useMemo, useEffect, memo } from 'react'
import { useCreateBannerView } from 'app/hooks/system/useCreateBannerView/useCreateBannerView'
import {
  selectGeo,
  selectAgent,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { selectBanners } from 'app/lib/features/banner/banner.selector'
import { getUrl } from 'app/utils/static.util'

const MiniBanner = () => {
  const banners = useSelector(selectBanners)
  const agent = useSelector(selectAgent)
  const userTable = useSelector(selectUserTable)
  const geo = useSelector(selectGeo)
  const { createBannerView } = useCreateBannerView()

  const banner = useMemo(
    () => banners.find((b) => b?.banner_type === BANNER.MINI_BANNER),
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
          className="mb-2 block h-[120px] w-[360px] overflow-hidden rounded"
        >
          <img
            src={getUrl(banner?.content_url) ?? ''}
            alt={banner?.name}
            loading="lazy"
            className="h-full w-full rounded"
          />
        </Link>
      )}
    </>
  )
}

export default memo(MiniBanner)
