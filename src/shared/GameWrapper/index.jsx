function GameWrapper({ children }) {
  return (
    <main className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      {children}
    </main>
  )
}

export default GameWrapper
