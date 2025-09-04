'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from '@/services/recipe.service'
import { useMutation } from '@tanstack/react-query'
import { fetchUserProfile, updateUserProfile } from '@/services/user.service'
import { Pencil, Save, X } from 'lucide-react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { Input } from './ui/input'

interface ProfileProps {
  userId: string
}

export default function Profile({ userId }: ProfileProps) {
  // session
  const { data: session } = useSession()

  // state: profile data
  const [profileData, setProfileData] = useState<User | null>(null)
  // state: edit mode
  const [isEditMode, setIsEditMode] = useState(false)

  // ref: image url
  const imageUrlRef = useRef<HTMLInputElement>(null)
  // ref: first name
  const firstNameRef = useRef<HTMLInputElement>(null)
  // ref: last name
  const lastNameRef = useRef<HTMLInputElement>(null)

  const {
    mutateAsync: getUserProfile,
    // isPending: isRecipeLoading,
    // isError: isRecipeError,
  } = useMutation({
    mutationFn: fetchUserProfile,
    onError: () => {
      console.log('error fetching')
    },
    onSuccess: (data) => {
      setProfileData(data)
    },
  })

  const {
    mutateAsync: updateUser,
    // isPending: isRecipeLoading,
    // isError: isRecipeError,
  } = useMutation({
    mutationFn: (data: Partial<User>) => {
      return updateUserProfile(userId, data)
    },
    onError: () => {
      console.log('error updating')
    },
    onSuccess: (data) => {
      setProfileData(data)
      setIsEditMode(false)
    },
  })

  const nameFallback = useMemo(() => {
    if (profileData?.firstName && profileData?.lastName) {
      return (
        profileData.firstName.charAt(0).toUpperCase() +
        profileData.lastName.charAt(0).toUpperCase()
      )
    }
    return 'User'
  }, [profileData])

  const isMyProfile = useMemo(() => {
    return userId === session?.userId
  }, [userId, session?.userId])

  // effect: init fetch profile data
  useEffect(() => {
    getUserProfile(userId)
  }, [])

  // callback: handle edit mode toggle
  const handleEditModeToggle = useCallback(() => {
    if (isMyProfile) {
      setIsEditMode((prev) => !prev)
    }
  }, [isMyProfile])

  // callback: handle cancel edit mode
  const handleCancelEditMode = useCallback(() => {
    setIsEditMode(false)
  }, [])

  // callback: handle save profile
  const handleSaveProfile = useCallback(() => {
    const updatedData: Partial<User> = {}
    if (imageUrlRef.current?.value) {
      // Assuming you have an imageUrl field in your User type
      ;(updatedData as any).imageUrl = imageUrlRef.current.value || null
    }
    if (firstNameRef.current?.value) {
      updatedData.firstName = firstNameRef.current.value
    }
    if (lastNameRef.current?.value) {
      updatedData.lastName = lastNameRef.current.value
    }
    updateUser(updatedData)
  }, [updateUser])

  return (
    <div className='w-full h-96 bg-gray-100 flex items-center rounded-lg flex-col gap-4'>
      <div className='w-full flex justify-end p-4'>
        {isEditMode ? (
          <div className='flex flex-row gap-2'>
            <Button
              variant='outline'
              size='icon'
              style={{ cursor: 'pointer' }}
              onClick={handleSaveProfile}
            >
              <Save />
            </Button>
            <Button
              variant='outline'
              size='icon'
              style={{ cursor: 'pointer' }}
              onClick={handleCancelEditMode}
            >
              <X />
            </Button>
          </div>
        ) : (
          <Button
            variant='outline'
            size='icon'
            style={{
              cursor: isMyProfile ? 'pointer' : 'not-allowed',
              opacity: isMyProfile ? 1 : 0.5,
            }}
            onClick={handleEditModeToggle}
          >
            <Pencil />
          </Button>
        )}
      </div>
      {isEditMode ? (
        <div className='flex flex-col items-center gap-2 mt-8 w-100'>
          <Input placeholder='Avatar URL' ref={imageUrlRef} />
          <Input
            placeholder='First Name'
            defaultValue={profileData?.firstName}
            ref={firstNameRef}
          />
          <Input
            placeholder='Last Name'
            defaultValue={profileData?.lastName}
            ref={lastNameRef}
          />
          <div className='text-md text-gray-300'>User ID: {userId}</div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-2 mt-8'>
          <Avatar className='w-32 h-32'>
            <AvatarImage
              src={profileData?.imageUrl || 'https://github.com/shadcn.png'}
              alt='profile picture'
              className='w-32 h-32 rounded-full'
            />
            <AvatarFallback className='w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-3xl'>
              {nameFallback}
            </AvatarFallback>
          </Avatar>
          <div className='text-2xl font-semibold'>
            {profileData?.firstName} {profileData?.lastName}
          </div>
          <div className='text-md text-gray-300'>User ID: {userId}</div>
        </div>
      )}
    </div>
  )
}
