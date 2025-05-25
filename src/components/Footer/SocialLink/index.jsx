import { Link } from 'next-view-transitions'
import Image from 'next/image'

export default function SocialLink({ href, icon, alt, target = '_blank' }) {
  return (
    <Link
      href={href}
      target={target}
      rel="noopener noreferrer"
      className="focus:ring-offset-background focus:ring-primary transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
    >
      <Image
        src={`/icons/${icon}.svg`}
        alt={alt}
        width={24}
        height={24}
        className="opacity-75 transition-opacity hover:opacity-100"
      />
    </Link>
  )
}
