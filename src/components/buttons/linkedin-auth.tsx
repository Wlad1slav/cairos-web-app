import {signIn} from "next-auth/react";
import Image from "next/image";
import {Button} from "@/components/ui/button";

function SignInWithLinkedin() {

    const handleSignIn = async () => {
        await signIn('linkedin');
    }

    return (
        <Button variant="outline" onClick={handleSignIn}>
            <div className="inside-button">
                <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s"
                    alt="google logo"
                    width={24}
                    height={24}
                />
                <p>Увійти з Linkedin</p>
            </div>
        </Button>
    );
}

export default SignInWithLinkedin;
