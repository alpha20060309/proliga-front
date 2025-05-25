import { Link } from 'next-view-transitions'

const SidebarSystemLink = ({ children, href, handleToggle }) => {
  return (
    <Link
      href={href}
      onClick={handleToggle}
      className="bg-foreground/20 hover:bg-secondary flex h-full w-full gap-2 rounded-sm p-2"
    >
      {children}
    </Link>
  )
}
export default SidebarSystemLink
