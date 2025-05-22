import { Link } from 'next-view-transitions'

const HeroSkeleton = () => {
  return (
    <section
      className="w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Hero-image.png')" }}
    >
      <div className="text-foregroundround flex h-svh flex-col items-center justify-center gap-6 md:h-screen">
        <div className="xs:gap-1 flex flex-col gap-0 text-center uppercase md:gap-2">
          <h2 className="xs:text-3xl text-2xl font-semibold sm:text-4xl 2xl:text-5xl">
            O&apos;z futbol jamoangizni
          </h2>
          <h2 className="xs:text-4xl text-3xl font-bold sm:text-5xl lg:text-6xl 2xl:text-7xl">
            Biz bilan yarating
          </h2>
        </div>
        <span className="bg-primary block h-3.5 w-4/5 -skew-x-45 rounded-sm md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3" />
        <section className="flex w-full flex-col items-center justify-center gap-2 text-lg font-bold sm:flex-row">
          <Link
            href="/auth"
            className="border-primary bg-primary hover:bg-opacity-50 flex h-16 w-full max-w-64 -skew-x-15 items-center justify-center rounded-sm border-2 font-bold text-background uppercase transition-all"
          >
            RO&apos;YXATDAN O&apos;TISH
          </Link>
          <Link
            href="/championships"
            className="border-primary text-primary hover:bg-primary hover:bg-opacity-50 flex h-16 w-full max-w-64 -skew-x-15 items-center justify-center rounded-sm border-2 bg-transparent font-bold uppercase transition-all hover:text-black"
          >
            O&apos;YINGA KIRISH
          </Link>
        </section>
      </div>
    </section>
  )
}

export default HeroSkeleton
