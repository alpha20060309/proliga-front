import Avatar from 'components/Avatar'

const NavbarUserMobile = ({ handleToggleModal }) => {
  return (
    <div
      onClick={handleToggleModal}
      className="flex cursor-pointer items-center justify-center gap-2 lg:hidden"
    >
      <Avatar className={'rounded-full text-lg'} />
    </div>
  )
}

export default NavbarUserMobile
