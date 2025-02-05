'use client'
import Link from 'next/link'

const NavLink = ({ children, href }) => {
  return (
    <Link
      href={href}
      className="flex h-full w-full gap-2 rounded px-1 py-1.5 hover:bg-neutral-800"
    >
      {children}
    </Link>
  )
}
export default NavLink
