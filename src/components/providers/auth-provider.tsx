'use client'

import React, {createContext} from "react";
import {redirect} from "next/navigation";
import {AuthProviderProps} from "@/lib/types";

export const AuthContext = createContext<AuthProviderProps>({
    profile: null,
    session: null,
})

function AuthProvider({children, session, profile}: AuthProviderProps & {children: React.ReactNode}) {

    if (!session) {
        redirect('/login');
    }

    return (
        <AuthContext.Provider value={{ profile, session }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;