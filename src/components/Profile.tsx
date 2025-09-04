'use client'

import { useEffect, useMemo, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from '@/services/recipe.service'
import { useMutation } from '@tanstack/react-query'
import { fetchUserProfile } from '@/services/user.service'

interface ProfileProps {
  userId: string
}

export default function Profile({ userId }: ProfileProps) {
  const [profileData, setProfileData] = useState<User | null>(null)

  const {
    mutateAsync: getUserProfile,
    isPending: isRecipeLoading,
    isError: isRecipeError,
  } = useMutation({
    mutationFn: fetchUserProfile,
    onError: () => {
      console.log('error fetching')
    },
    onSuccess: (data) => {
      setProfileData(data)
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

  // effect: init fetch profile data
  useEffect(() => {
    getUserProfile(userId)
  }, [])

  return (
    <div
      className='w-full h-96 bg-gray-100 flex justify-center items-center
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
          {nameFallback}
        </AvatarFallback>
      </Avatar>
      <div className='text-2xl font-semibold'>
        {profileData?.firstName} {profileData?.lastName}
      </div>
      <div className='text-md text-gray-600'>User ID: {userId}</div>
    </div>
  )
}
