import Profile from '@/components/Profile'

type ProfileProps = {
  params: Promise<{
    userId: string
  }>
}

const ProfilePage = async ({ params }: ProfileProps) => {
  const { userId } = await params

  return (
    <>
      <div className='px-8 py-6'>
        <h1 className='pt-6 pb-8 text-4xl font-bold'>โปรไฟล์ของฉัน</h1>
        <Profile userId={userId} />
      </div>
    </>
  )
}

export default ProfilePage
