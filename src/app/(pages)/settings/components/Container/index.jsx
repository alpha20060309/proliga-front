export const SettingsContainer = ({ children }) => {
  return (
    <section className="fade-in-fast flex h-full w-full flex-1 flex-col gap-2 rounded-xl bg-neutral-900/80 p-4 backdrop-blur lg:h-auto lg:p-6">
      {children}
    </section>
  )
}
