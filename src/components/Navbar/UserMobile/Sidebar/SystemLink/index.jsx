import { Link } from 'next-view-transitions'

const SidebarSystemLink = ({ children, href, handleToggle }) => {
  return (
    <Link
      href={href}
      onClick={handleToggle}
      className="flex h-full w-full gap-2 rounded-sm bg-foreground/20 p-2 hover:bg-secondary"
    >
      {children}
    </Link>
  )
}
export default SidebarSystemLink
