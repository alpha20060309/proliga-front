import { Link } from 'next-view-transitions'

const SidebarSystemLink = ({ children, href, handleToggle }) => {
  return (
    <Link
      href={href}
      onClick={handleToggle}
      className="flex h-full w-full gap-2 rounded-sm bg-neutral-900 p-2 hover:bg-neutral-700"
    >
      {children}
    </Link>
  )
}
export default SidebarSystemLink
