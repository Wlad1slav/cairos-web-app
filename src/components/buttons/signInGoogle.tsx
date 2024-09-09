import Image from "next/image";
import {Button} from "@/components/ui/button";

function SignInWithGoogle() {

    const handleSignIn = async () => {
        // URL for Google authentication
        const googleSignInUrl = '/api/auth/signin/google';

        // Redirects the user to an external browser
        // This is required for correct authorization through the mobile application
        if (typeof window !== "undefined") {
            window.open(googleSignInUrl, '_blank'); // Opens the URL in a new window or tab
        }
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
