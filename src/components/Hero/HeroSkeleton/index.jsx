import Link from 'next/link'

const HeroSkeleton = () => {
  return (
    <section
      className="w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Hero-image.png')" }}
    >
      <div className="flex h-svh flex-col items-center justify-center gap-6 text-white md:h-screen">
        <div className="flex flex-col gap-0 text-center uppercase xs:gap-1 md:gap-2">
          <h2 className="text-2xl font-semibold xs:text-3xl sm:text-4xl 2xl:text-5xl">
            O&apos;z futbol jamoangizni
          </h2>
          <h2 className="text-3xl font-bold xs:text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl">
            Biz bilan yarating
          </h2>
        </div>
        <span className="block h-3.5 w-4/5 -skew-x-[45deg] rounded bg-primary md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3" />
        <section className="flex w-full flex-col items-center justify-center gap-2 text-lg font-bold sm:flex-row">
          <Link
            href="/auth"
            className="flex h-16 w-full max-w-64 -skew-x-[15deg] items-center justify-center rounded border-2 border-primary bg-primary font-bold uppercase text-black transition-all hover:bg-opacity-50"
          >
            RO&apos;YXATDAN O&apos;TISH
          </Link>
          <Link
            href="/championships"
            className="flex h-16 w-full max-w-64 -skew-x-[15deg] items-center justify-center rounded border-2 border-primary bg-transparent font-bold uppercase text-primary transition-all hover:bg-primary hover:bg-opacity-50 hover:text-black"
          >
            O&apos;YINGA KIRISH
          </Link>
        </section>
      </div>
    </section>
  )
}

export default HeroSkeleton
