'use client'
import { Link } from 'next-view-transitions'

const NavLink = ({ children, href }) => {
  return (
    <Link
      href={href}
      className="hover:bg-sidebar-accent flex h-full w-full gap-2 rounded px-1 py-1.5 transition-all"
    >
      {children}
    </Link>
  )
}
export default NavLink
