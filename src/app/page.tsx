'use client'

import { useProfile } from "@/contexts/pofileContext";

export default function Home() {

  const { profile } = useProfile()

  return (
    <main>
      <div>
        {
          profile ? `Hello, ${profile.full_name}` : `Hello World`
        }
      </div>
    </main>
  );
}
