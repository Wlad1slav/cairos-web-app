'use client'

import React from "react";
import AuthProvider from "@/components/providers/auth-provider";
import {useSession} from "next-auth/react";

export default function ProfileLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    const {data: session} = useSession();

    return (
        <AuthProvider session={session}>
            {children}
        </AuthProvider>
    );
}
