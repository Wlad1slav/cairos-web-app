import {signIn} from "next-auth/react";
import Image from "next/image";
import {Button} from "@/components/ui/button";

function SignInWithGoogle() {

    const handleSignIn = async () => {
        await signIn('google');
    }

    return (
        <Button variant="outline" onClick={handleSignIn}>
            <div className="inside-button">
                <Image
                    src="/assets/images/Google__G__logo.svg.webp"
                    alt="google logo"
                    width={24}
                    height={24}
                />
                <p>Увійти з Google</p>
            </div>
        </Button>
    );
}

export default SignInWithGoogle;