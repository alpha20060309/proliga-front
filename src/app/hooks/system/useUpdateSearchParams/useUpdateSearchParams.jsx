import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function useUpdateSearchParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateSearchParams = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, encodeURIComponent(value))

      router.push(pathname + '?' + params.toString())
    },
    [searchParams, pathname, router]
  )

  return updateSearchParams
}
