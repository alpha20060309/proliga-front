import Gutter from 'shared/Gutter'
import BannerTemplate from 'app/[locale]/play/components/BannerTemplate'
import GameProfile from './components/GameProfile'

export default function ProfilePage() {
  return (
    <Gutter>
      <BannerTemplate>
        <GameProfile />
      </BannerTemplate>
    </Gutter>
  )
}
