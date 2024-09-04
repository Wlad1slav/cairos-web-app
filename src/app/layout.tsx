import type { Metadata } from "next";
import "./globals.css";
import '@/styles/emoji.scss';
import SessionWrapper from "@/components/providers/session-wrapper";
import {Toaster} from "@/components/ui/toaster";
import React from "react";

export const metadata: Metadata = {
  title: "Cairos — Додаток для саморозвитку",
  description: "Додаток саморозвитку. Шедевр кожного дня через яскраві звички в креативності, фінансах, розвитку розуму, тіла та відносин.",
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
