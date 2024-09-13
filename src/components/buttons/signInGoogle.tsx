import {signIn} from "next-auth/react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

function SignInWithGoogle() {

    const handleSignIn = async () => {
        await signIn('google');
    }

    return (
        <>
            <Button variant="outline" onClick={handleSignIn} className="w-full hidden sm:flex">
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
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger disabled={true} className="disabled:opacity-50 w-full sm:hidden">
                        <span
                            className="inside-button inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none">
                                <Image
                                    src="/assets/images/Google__G__logo.svg.webp"
                                    alt="google logo"
                                    width={24}
                                    height={24}
                                />
                                Увійти з Google
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Доступно тільки через десктоп</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
}

export default SignInWithGoogle;
