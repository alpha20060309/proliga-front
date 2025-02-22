import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const YandexSignIn = () => {
  return (
    <>
      <Button
        onClick={() => signIn('yandex')}
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
    </>
  )
}

export default YandexSignIn
