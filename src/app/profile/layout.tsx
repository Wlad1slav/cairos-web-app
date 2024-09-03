'use client'

import React, {useEffect, useState} from "react";
import AuthProvider from "@/components/providers/auth-provider";
import {useSession} from "next-auth/react";
import {TProfile} from "@/lib/models";
import {useRequest} from "@/lib/hooks/useRequest";

export default function ProfileLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    const {data: session} = useSession();
    const [profile, setProfile] = useState<TProfile | null>(null);
    const {post} = useRequest();

    useEffect(() => {
        if (session) {
            post('/profile').then(response => {
                setProfile(response.data.profile as TProfile);
            });
        }
    }, [session]);

    return (
        <AuthProvider session={session} profile={profile}>
            {children}
        </AuthProvider>
    );
}
