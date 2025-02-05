import { Button } from '@/components/ui/button'
import Image from 'next/image'

const YandexSignIn = () => {
  return (
    <Button variant="outline" className="flex-1 p-0">
      <Image
        src="./icons/yandex.svg"
        alt="Yandex"
        className="mr-2 size-4"
        width={24}
        height={24}
      />
      Yandex
    </Button>
  )
}

export default YandexSignIn
