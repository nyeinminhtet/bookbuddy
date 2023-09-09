import Chat from "@/components/Chat";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "@/components/Providers";

const popin = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookBuddy",
  description: "Your book store for fantasy & mystery novels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={popin.className}>
          <Chat />
          {children}
        </body>
      </Providers>
    </html>
  );
}
