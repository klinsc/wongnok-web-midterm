'use client'

import { getFavorites, Recipe } from '@/services/recipe.service'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import CardRecipe from './CardRecipe'
import SkeletonCardLoading from './SkeletonCardLoading'
import { Input } from './ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

export default function Favorites() {
  // session
  const { data: session } = useSession()

  const limitDataPerPage = 5
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  params.set('limit', String(limitDataPerPage))

  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page') ?? 1)
  )
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get('search') ?? ''
  )

  const { data, isLoading: isFavoriteLoading } = useQuery<{
    results: Recipe[]
    total: number
  }>({
    queryKey: ['getFavorites', session?.userId, currentPage, searchInput],
    queryFn: () => {
      return getFavorites({
        page: currentPage,
        limit: limitDataPerPage,
        search: searchInput,
      })
    },
    refetchOnWindowFocus: false,
    enabled: !!session?.userId,
  })

  const recipesData = useMemo(() => {
    if (data) {
      return data
    }
    return { results: [], total: 0 }
  }, [data])

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('search', value)
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
    setCurrentPage(1)
  }, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', String(limitDataPerPage))
    params.set('page', String(currentPage))
    if (searchInput) {
      params.set('search', searchInput)
    }
    router.push(`${pathname}?${params.toString()}`)
  }, [currentPage])

  return (
    <>
      <div className='mb-8'>
        <Input
          placeholder='ค้นหาสูตรอาหาร...'
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value)
            handleSearch(e.target.value)
          }}
        />
      </div>

      {isFavoriteLoading ? (
        <div>
          <div className='flex flex-wrap gap-8'>
            {[1, 2, 3, 4].map((i) => {
              return <SkeletonCardLoading key={i} />
            })}
          </div>
        </div>
      ) : (
        <div className='flex flex-wrap gap-8'>
          {recipesData &&
            recipesData.results.length > 0 &&
            recipesData.results.map((recipe) => {
              return <CardRecipe key={recipe.id} {...recipe} />
            })}
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setCurrentPage((prev) => {
                  return prev <= 1 ? prev : prev - 1
                })
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setCurrentPage((prev) => {
                  return prev >= Math.ceil(recipesData.total / limitDataPerPage)
                    ? prev
                    : prev + 1
                })
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
