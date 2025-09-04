import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Avatar } from '@radix-ui/react-avatar'

type ProfileProps = {
  params: Promise<{
    userId: string
  }>
}

const Profile = async ({ params }: ProfileProps) => {
  const { userId: recipeId } = await params

  return (
    <>
      <div className='px-8 py-6'>
        <h1 className='pt-6 pb-8 text-4xl font-bold'>โปรไฟล์ของฉัน</h1>
        <div
          className='w-full h-96 bg-gray-200 flex justify-center items-center
        rounded-lg flex-col gap-4
        '
        >
          <Avatar className='w-32 h-32'>
            <AvatarImage
              src=''
              alt='profile picture'
              className='w-32 h-32 rounded-full'
            />
            <AvatarFallback className='w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-3xl'>
              U
            </AvatarFallback>
          </Avatar>
          Profile {recipeId}
        </div>
      </div>
    </>
  )
}

export default Profile
