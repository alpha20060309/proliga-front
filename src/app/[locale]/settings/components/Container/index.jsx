

export const SettingsContainer = ({ children }) => {
  return (
    <section className="fade-in-fast bg-card flex h-full w-full flex-1 flex-col gap-2 rounded-xl p-4 backdrop-blur-sm lg:h-auto lg:p-6">
      {children}
    </section>
  )
}
