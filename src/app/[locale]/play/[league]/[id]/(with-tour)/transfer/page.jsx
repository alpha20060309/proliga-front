'use client'

import BannerTemplate from 'app/[locale]/play/components/BannerTemplate'
import Gutter from 'shared/Gutter'
import Transfer from 'app/[locale]/play/components/Transfer'

export default function TransferPage() {
  return (
    <Gutter>
      <BannerTemplate>
        <Transfer />
      </BannerTemplate>
    </Gutter>
  )
}
