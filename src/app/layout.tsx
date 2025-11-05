import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exploration 4",
  description: "brook hamiltons exploration 4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
