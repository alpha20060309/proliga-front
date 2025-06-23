import { SelectTrigger } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

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

export function StadiumSelectTrigger({ children, ...props }) {
  return (
    <SelectTrigger
      className=" border-border bg-card dark:bg-card dark:hover:bg-card text-foreground hover:border-primary w-36 data-[size=default]:h-10 sm:w-40 md:w-48"
      {...props}
    >
      {children}
    </SelectTrigger>
  )
}

export function StadiumSaveButton({ children, ...props }) {
  return (
    <Button className="bg-card text-foreground 2xs:min-w-28 hover:border-accent-foreground border-border hover:bg-accent hover:text-accent-foreground h-10 min-w-24 border text-sm font-bold transition-all sm:min-w-32" {...props}>{children}</Button>
  )
}


