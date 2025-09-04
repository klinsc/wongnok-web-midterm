import { CardRecipeProps } from '@/app/page'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardContent, CardFooter } from './ui/card'

const CardRecipe = ({
  name,
  imageUrl,
  description,
  difficulty,
  cookingDuration,
  user,
}: CardRecipeProps) => {
  let difficultyTh = ''
  switch (difficulty.name) {
    case 'Easy':
      difficultyTh = 'ง่าย'
      break
    case 'Medium':
      difficultyTh = 'ปานกลาง'
      break
    case 'Hard':
      difficultyTh = 'ยาก'
      break
    default:
      difficultyTh = difficulty.name
  }

  const nameFallback = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() +
      user.lastName.charAt(0).toUpperCase()
    : 'User'

  return (
    <Card className='w-[276px] h-[390px]'>
      <div>
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
        <div className='p-2'>
          <CardContent>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <h1 className='font-bold max-w-[200px] line-clamp-1'>{name}</h1>

              <div>
                <Heart />
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
              <AvatarImage src='https://github.com/shadcn.pn' />
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
