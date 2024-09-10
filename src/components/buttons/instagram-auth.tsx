import {signIn} from "next-auth/react";
import Image from "next/image";
import {Button} from "@/components/ui/button";

function SignInWithInstagram() {

    const handleSignIn = async () => {
        await signIn('instagram');
    }

    return (
        <Button variant="outline" onClick={handleSignIn}>
            <div className="inside-button">
                <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s"
                    alt="google logo"
                    width={24}
                    height={24}
                />
                <p>Увійти з Instagram</p>
            </div>
        </Button>
    );
}

export default SignInWithInstagram;
