import { CardRecipeProps } from '@/app/page'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardContent, CardFooter } from './ui/card'
import Link from 'next/link'
import { Button } from './ui/button'
import { favoriteRecipe, isRecipeFavorited } from '@/services/recipe.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { signIn, useSession } from 'next-auth/react'
import { useMemo } from 'react'

const CardRecipe = ({
  id,
  name,
  imageUrl,
  description,
  difficulty,
  cookingDuration,
  user,
}: CardRecipeProps) => {
  //session
  const { data: session } = useSession()

  const difficultyTh = useMemo(() => {
    switch (difficulty.name) {
      case 'Easy':
        return 'ง่าย'
      case 'Medium':
        return 'ปานกลาง'
      case 'Hard':
        return 'ยาก'
      default:
        return difficulty.name
    }
  }, [difficulty.name])

  const nameFallback = useMemo(
    () =>
      user?.firstName
        ? user.firstName.charAt(0).toUpperCase() +
          user.lastName.charAt(0).toUpperCase()
        : 'User',
    [user]
  )

  const query = useQuery({
    queryKey: ['isFavorited', id],
    queryFn: () => isRecipeFavorited(id),
    refetchOnWindowFocus(query) {
      return false
    },
    enabled: !!session?.user,
  })
  const isFavorited = useMemo(() => {
    if (query.data) {
      return query.data
    }
    return false
  }, [query.data])

  const { mutateAsync: handleFavoriteRecipe } = useMutation({
    mutationFn: () => favoriteRecipe(id, !isFavorited).then(() => !isFavorited),
    onError: () => {
      console.log('error fetching')
    },
    onSuccess: (data) => {
      query.refetch()
    },
  })

  return (
    <Card className='w-[276px] h-[390px]'>
      <div>
        <Link href={`recipe-details/${id}`}>
          <div className='h-[158px] relative rounded-t-lg pb-4'>
            {imageUrl ? (
              <Image
                unoptimized
                priority
                src={imageUrl}
                alt={`${name} image`}
                fill
                sizes='(max-width: 276px) 100vw, 276px'
              />
            ) : (
              <Image
                unoptimized
                priority
                src={'/images/istockphoto-1396814518-612x612.jpg'}
                alt={`${name} image`}
                fill
                sizes='(max-width: 276px) 100vw, 276px'
              />
            )}
          </div>
        </Link>
        <div className='p-2'>
          <CardContent>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Link href={`recipe-details/${id}`}>
                <h1 className='font-bold max-w-[200px] line-clamp-1'>{name}</h1>
              </Link>

              <div>
                <Button
                  variant='ghost'
                  className='p-1 rounded-full'
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    session?.user ? handleFavoriteRecipe() : signIn('keycloak')
                  }
                >
                  <Heart size={18} fill={isFavorited ? 'red' : 'none'} />
                </Button>
              </div>
            </div>
            <p className='text-secondary line-clamp-3'>{description}</p>
          </CardContent>
        </div>
      </div>

      <div>
        <CardFooter>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div className='flex p-1 grow gap-1'>
              <img src='/icons/av_timer.svg' alt='av timer' />
              <p>{difficultyTh}</p>
            </div>
            <div
              className='flex p-1 grow gap-1'
              style={{
                justifyContent: 'flex-end',
              }}
            >
              <img src='/icons/level.svg' alt='level' />
              <p>{cookingDuration.name}</p> <p>นาที</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
            }}
          >
            <Avatar>
              {user.imageUrl && (
                <AvatarImage src={user.imageUrl || ''} alt='Avatar' />
              )}
              <AvatarFallback>{nameFallback}</AvatarFallback>
            </Avatar>
            <p
              className='pl-2 pt-1 text-sm text-secondary'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {user.firstName} {user.lastName}
            </p>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}

export default CardRecipe
