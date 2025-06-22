'use client'

import BannerTemplate from 'app/[locale]/play/components/BannerTemplate'
import Gutter from 'shared/Gutter'
import Transfer from '../components/Transfer'

export default function TransferPage() {
  return (
    <Gutter mobileFriendly>
      <BannerTemplate>
        <Transfer />
      </BannerTemplate>
    </Gutter>
  )
}
