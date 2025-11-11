'use client'

import { Children, createContext, useContext } from "react"

import { Profile } from "@/types/profile"


//data structure
type profileProps = {
  profile: Profile | undefined
  updateProfile: (profile: Profile, avatar: File | undefined) => void
}

//create context
const ProfileContext = createContext<profileProps | undefined>(undefined)

//provider
export function ProfileProvider(props: { profile: Profile | undefined, children: React.ReactNode }) {

  async function updateProfile(profile: Profile, avatar: File | undefined) {

    let avatarUrl: string | null = null
    if (avatar) {
      const formData = new FormData()
      formData.append("id", profile.id)
      formData.append("image", avatar)
      const res = await fetch("/api/avatar",
        {
          method: "POST",
          body: formData
        }
      )

      const data = await res.json()
      avatarUrl = data.avatarUrl
    }

    console.log(avatarUrl)

  }

  return (
    <ProfileContext.Provider value={{ profile: props.profile, updateProfile }}>
      {props.children}
    </ProfileContext.Provider>
  )

}
//use
export function useProfile() {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider")
  }

  return context

}