const GlowingSunBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute h-full w-full">
        <span className="absolute min-w-80 animate-float-ball rounded-full bg-linear-to-br from-yellow-400 to-primary opacity-25 blur-xl" />
      </div>
    </div>
  )
}

export default GlowingSunBackground
