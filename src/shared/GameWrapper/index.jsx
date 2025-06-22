export function GameWrapper({ children }) {
  return (
    <main className="flex w-full flex-col justify-between gap-2 lg:flex-row">
      {children}
    </main>
  )
}

export function StadiumSectionWrapper({ children }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-lg grow flex-col px-4 sm:px-0 lg:mx-0 lg:w-1/2 lg:max-w-2xl xl:grow-0">
      {children}
    </div>
  )
}
