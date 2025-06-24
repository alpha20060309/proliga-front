import Gutter from 'components/Gutter'
import BannerTemplate from 'app/[locale]/play/components/BannerTemplate'
import GameProfile from './components/GameProfile'

export default function ProfilePage() {
  return (
    <Gutter mobileFriendly>
      <BannerTemplate>
        <GameProfile />
      </BannerTemplate>
    </Gutter>
  )
}
