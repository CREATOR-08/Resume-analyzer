
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "ResumeLens - Resume Analysis Tool",
  description: "Get honest, practical suggestions to improve your resume clarity, formatting, and structure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
