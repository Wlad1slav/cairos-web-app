import {signIn} from "next-auth/react";
import Image from "next/image";
import {Button} from "@/components/ui/button";

function SignInWithReddit() {

    const handleSignIn = async () => {
        await signIn('reddit');
    }

    return (
        <Button variant="outline" onClick={handleSignIn}>
            <div className="inside-button">
                <Image
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/220px-Reddit_Logo_Icon.svg.png"
                    alt="google logo"
                    width={24}
                    height={24}
                />
                <p>Увійти з Reddit</p>
            </div>
        </Button>
    );
}

export default SignInWithReddit;
