import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { ProfileProvider } from "@/contexts/pofileContext";
import { Profile } from "@/types/profile";

export const metadata: Metadata = {
  title: "Exploration 4",
  description: "brook hamiltons exploration 4",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <ProfileProvider profile={await getProfile()}>
        <body>
          {children}
        </body>
      </ProfileProvider>
    </html>
  );
}

async function getProfile(): Promise<Profile | undefined> {
  const supabase = await createClient()

  const user = await supabase.auth.getUser()

  const data = await supabase
    .from('profiles')
    .select()
    .eq('id', user.data.user?.id)

  console.log(data.data)

  let profile: Profile | undefined = undefined

  if (data.data && data.data.length > 0) {
    profile = data.data[0]
  }

  return profile
}