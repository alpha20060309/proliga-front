'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import CreateTeamSlide from './CreateTeamSlide'
import GatherPointsSlide from './GatherPointsSlide'
import MakeTransfersSlide from './MakeTransfersSlide'
import CompeteSlide from './CompeteSlide'
import RulesSliderTitle from './RulesSliderTitle'
import WinPrizesSlide from './WinPrizesSlide'

function RulesSlider() {
  return (
    <Carousel opts={{ loop: true }} className="mx-7 xl:mx-8">
      <RulesSliderTitle />
      <CarouselContent className="mb-6">
        <CarouselItem className="min-h-96 rounded md:min-h-104 xl:min-h-136">
          <CreateTeamSlide />
        </CarouselItem>
        <CarouselItem className="min-h-96 md:min-h-104 xl:min-h-136">
          <GatherPointsSlide />
        </CarouselItem>
        <CarouselItem className="min-h-96 rounded md:min-h-104 xl:min-h-136">
          <MakeTransfersSlide />
        </CarouselItem>
        <CarouselItem className="min-h-96 md:min-h-104 xl:min-h-136">
          <CompeteSlide />
        </CarouselItem>
        <CarouselItem className="min-h-96 rounded md:min-h-104 xl:min-h-136">
          <WinPrizesSlide />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="-left-9 xl:-left-11 2xl:-left-14" />
      <CarouselNext className="-right-9 xl:-right-11 2xl:-right-14" />
    </Carousel>
  )
}

export default RulesSlider
