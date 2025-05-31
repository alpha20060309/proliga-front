'use client'
import Gutter from 'shared/Gutter'
export default function TeamViewLayout({ children }) {
  return (
    <div className="from-chart-1 to-chart-2 text-foreground flex flex-col gap-4 overflow-hidden bg-linear-to-tr pt-20">
      <Gutter>{children}</Gutter>
    </div>
  )
}
