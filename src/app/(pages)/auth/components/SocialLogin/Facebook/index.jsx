import { Button } from '@/components/ui/button'
import Image from 'next/image'

const FacebookSignIn = () => {
  return (
    <>
      <Button variant="outline" className="w-1/2 p-0">
        <Image
          src="./icons/facebook.svg"
          alt="Facebook"
          className="mr-2 size-4"
          width={24}
          height={24}
        />
        Facebook
      </Button>
    </>
  )
}

export default FacebookSignIn
