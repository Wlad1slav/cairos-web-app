'use client'

import React from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {Session} from "next-auth";

function AuthProvider({children, session}: {children: React.ReactNode, session: Session | null}) {

    if (!session) {
        redirect('/login');
    }

    return (
        <>
            {children}
        </>
    )

}

export default AuthProvider;