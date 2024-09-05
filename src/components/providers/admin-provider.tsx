'use client'

import React, {createContext} from "react";
import {redirect} from "next/navigation";
import {AdminProviderProps} from "@/lib/types";

export const AuthContext = createContext<AdminProviderProps>({
    isAdmin: false,
})

function AdminProvider({children, isAdmin}: AdminProviderProps & {children: React.ReactNode}) {

    if (!isAdmin) {
        redirect('/profile');
    }

    return (
        <AuthContext.Provider value={{ isAdmin }}>
            {children}
        </AuthContext.Provider>
    );

}

export default AdminProvider;