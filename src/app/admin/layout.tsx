'use client'

import React, {useEffect, useState} from "react";
import './style.scss';
import AdminPanelNavigation from "@/components/admin/admin-panel-navigation";
import AdminProvider from "@/components/providers/admin-provider";
import {TProfile} from "@/lib/models";
import axios from "axios";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";

export default function AdminPanelLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    const [profile, setProfile] = useState<TProfile | null>(null);
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/v1/profile')
            .then(res => {
                setProfile(res.data.profile);
            })
            .catch(e => {
                if (e.status === 401) {
                    router.push('/login');
                }
            });
    }, []);

    if (!profile) {
        return (
            <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" color="orange"/>
                <h1>Перевірка доступу...</h1>
            </div>
        );
    }

    return (
        <AdminProvider isAdmin={profile.isAdmin}>
            <AdminPanelNavigation />
            {children}
        </AdminProvider>
    );
}