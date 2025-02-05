export const FieldLines = () => {
  return (
    <div className="absolute inset-0">
      {/* Outer field border */}
      <div className="absolute inset-8 rounded-md border-2 border-white/30" />

      {/* Center circle */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white/30" />

      {/* Center line */}
      <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-white/30" />

      {/* Penalty areas */}
      <div className="absolute left-8 right-8 top-8 h-48 border-2 border-white/30" />
      <div className="absolute bottom-8 left-8 right-8 h-48 border-2 border-white/30" />

      {/* Goal areas */}
      <div className="absolute left-32 right-32 top-8 h-24 border-2 border-white/30" />
      <div className="absolute bottom-8 left-32 right-32 h-24 border-2 border-white/30" />

      {/* Corner arcs */}
      <div className="absolute left-8 top-8 h-16 w-16 rounded-br-full border-r-2 border-white/30" />
      <div className="absolute right-8 top-8 h-16 w-16 rounded-bl-full border-l-2 border-white/30" />
      <div className="absolute bottom-8 left-8 h-16 w-16 rounded-tr-full border-r-2 border-white/30" />
      <div className="absolute bottom-8 right-8 h-16 w-16 rounded-tl-full border-l-2 border-white/30" />
    </div>
  )
}
