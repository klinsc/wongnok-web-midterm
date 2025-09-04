'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { useSession, signIn, signOut } from 'next-auth/react'

const Navbar = () => {
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
        }}
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
            ชื่อ {session.user?.name}
            <Button onClick={() => signOut()}>SingOut</Button>
          </div>
        ) : (
          <Button
            className='text-white'
            style={{ backgroundColor: '#E030F6' }}
            variant='default'
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
