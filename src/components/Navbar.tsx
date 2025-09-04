'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'
import Link from 'next/link'

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
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem className='relative'>
                <NavigationMenuTrigger>
                  {session.user?.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className='absolute right-0 z-50'>
                  <ul>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href='#'>โปรไฟล์ของฉัน</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href='#'>สูตรอาหารของฉัน</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href='#'>สูตรอาหารสุดโปรด</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href='' onClick={() => signOut()}>
                          ออกจากระบบ
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
