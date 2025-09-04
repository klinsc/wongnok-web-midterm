'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  // router
  const router = useRouter()

  const { data: session } = useSession()

  return (
    <div className='flex justify-between items-center px-4 h-16 border-b'>
      <div
        style={{
          width: 182,
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => router.push('/')}
      >
        <img src='/wongnok-with-name-logo.png' alt='wongnok-logo' />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {session ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            ชื่อผู้ใช้: {session.user?.name}
            <Button
              className='text-secondary bg-none'
              variant='outline'
              onClick={() => signOut()}
              style={{
                cursor: 'pointer',
              }}
            >
              ลงชื่อออก
            </Button>
          </div>
        ) : (
          <Button
            style={{
              color: '#E030F6',
              cursor: 'pointer',
            }}
            variant='outline'
            onClick={() => signIn('keycloak')}
          >
            เข้าสู่ระบบ
          </Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
