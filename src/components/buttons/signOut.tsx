import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";

function SignOut({...props}) {
    return (
        <Button variant="destructive" onClick={() => signOut()} {...props}>Вийти</Button>
    );
}

export default SignOut;