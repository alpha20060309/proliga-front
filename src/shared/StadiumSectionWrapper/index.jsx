function StadiumSectionWrapper({ children }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-lg lg:max-w-2xl grow flex-col lg:mx-0 lg:w-1/2 xl:grow-0 px-4 sm:px-0">
      {children}
    </div>
  )
}

export default StadiumSectionWrapper
