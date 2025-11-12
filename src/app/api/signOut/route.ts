import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supbase = await createClient()

  const { error } = await supbase.auth.signOut()

  if (error){ 
    return NextResponse.json({message: "Failed to sign out"})
  }

  else {
    return NextResponse.json({message: "signed out succesfully"})
  }
}