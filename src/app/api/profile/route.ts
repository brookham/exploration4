import { createClient } from "@/utils/supabase/server"

import { Profile } from "@/types/profile"

export async function PUT(request: Request) {
  const data = await request.json()

  const profile = data.profile as Profile

  if (!profile){
    return Response.json({message: "No profile in body"})
  }

  const supabase = await createClient()

  const user = await supabase.auth.getUser()

  if (!user || !user.data.user){
    return Response.json({message: "Must be logged in"})
  }

  if (profile.id !== user.data.user.id){
    return Response.json({message: "Invalid user"})
  }

  const { error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', profile.id)

  if (error){
    return Response.json({message: "failed to update"})
  }

  return Response.json({message: "success"})
}