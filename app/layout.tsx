
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/session";

export const metadata = {
  title: "resume-lens - Resume Analysis Tool",
  description: "Get honest, practical suggestions to improve your resume clarity, formatting, and structure.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#040407] text-zinc-100 antialiased">
        <Navbar initialUser={user} />
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
