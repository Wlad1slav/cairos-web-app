import type { Metadata } from "next";
import "./globals.css";
import '@/styles/emoji.scss';
import SessionWrapper from "@/components/providers/session-wrapper";
import {Toaster} from "@/components/ui/toaster";
import React from "react";
import {landingMetadata} from "@/config/landing.config";

export const metadata: Metadata = {
    ...landingMetadata,
    openGraph: {
        ...landingMetadata,
        images: '/assets/images/landing_image.webp',
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SessionWrapper>
        <html lang="en">
            <body>
            <main>
                {children}
                <Toaster />
            </main>
            </body>
        </html>
      </SessionWrapper>
  );
}
