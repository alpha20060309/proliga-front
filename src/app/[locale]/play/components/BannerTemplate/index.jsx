import LeftSideBanner from 'components/Banners/LeftSide'
import RightSideBanner from 'components/Banners/RightSide'

export default function BannerTemplate({ children }) {
  return (
    <div className="flex gap-2 xl:gap-4">
      <LeftSideBanner />
      {children}
      <RightSideBanner />
    </div>
  )
}
