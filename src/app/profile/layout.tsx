'use client'

import React, {useEffect, useState} from "react";
import AuthProvider from "@/components/providers/auth-provider";
import {useSession} from "next-auth/react";
import axios from "axios";
import {ProfileModel} from "@/lib/models";

export default function ProfileLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    const {data: session} = useSession();
    const [profile, setProfile] = useState<ProfileModel | null>(null);

    useEffect(() => {
        if (session) {
            axios.post('/api/v1/profile').then(response => {
                setProfile(response.data.profile as ProfileModel);
            });
        }
    }, [session]);

    return (
        <AuthProvider session={session} profile={profile}>
            {children}
        </AuthProvider>
    );
}
