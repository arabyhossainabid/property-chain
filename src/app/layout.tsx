import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropChain — Manage Property Sales & Agent Conversations",
  description:
    "PropChain is the all-in-one dashboard to manage property sales, agent conversations, and real estate operations in one place.",
  keywords: "property management, real estate CRM, agent management, property sales",
};

import SmoothScroll from "@/components/smooth-scroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative ">
        <SmoothScroll>
          {/* Global Background Image for Hero and Navbar area */}
          <div className="absolute top-3.5 left-3.5 right-3.5 h-screen -z-10 pointer-events-none opacity-60 overflow-hidden rounded-3xl bg-white">
            <Image
              src="/Blend Group 2.svg"
              alt="Background swirl"
              fill
              className="object-cover"
              priority
            />
          </div>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
