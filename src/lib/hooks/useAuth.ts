import {useContext} from "react";
import {AuthContext} from "@/components/providers/auth-provider";

export const useAuth = () => {
    const auth = useContext(AuthContext);

    return {
        profile: auth.profile,
        session: auth.session,
    }
};