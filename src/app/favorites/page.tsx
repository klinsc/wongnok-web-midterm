import Favorites from '@/components/Favorites'
import Profile from '@/components/Profile'
import SkeletonCardLoading from '@/components/SkeletonCardLoading'

const ProfilePage = async () => {
  return (
    <>
      <div className='px-8 py-6'>
        <h1 className='pt-6 pb-8 text-4xl font-bold'>เมนูโปรดของฉัน</h1>
        <Favorites />
      </div>
    </>
  )
}

export default ProfilePage
