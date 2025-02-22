import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const YandexSignIn = () => {
  const { data: session } = useSession()

  const handleYandexSignIn = () => {
    if (!session?.expires) {
      // eslint-disable-next-line no-undef
      signIn('yandex', { redirect: process.env.NEXT_PUBLIC_URL + '/auth' })
    }
  }

  return (
    <Button
      onClick={handleYandexSignIn}
      variant="outline"
      className="w-1/2 p-0"
    >
      <Image
        src="./icons/yandex.svg"
        alt="Facebook"
        className="mr-2 size-4"
        width={24}
        height={24}
      />
      Yandex
    </Button>
  )
}

export default YandexSignIn
