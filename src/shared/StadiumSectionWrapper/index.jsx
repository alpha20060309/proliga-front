function StadiumSectionWrapper({ children }) {
  return (
    <div className="flex h-auto grow flex-col lg:w-1/2 xl:grow-0 lg:max-w-lg">
      {children}
    </div>
  )
}

export default StadiumSectionWrapper
