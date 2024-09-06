import Link from "next/link";
import Image from "next/image";
import {header} from "@/config/landing.config";
import {Button} from "@/components/ui/button";

function LandingHeader() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link href="#" className="flex items-center justify-center" prefetch={false}>
                <Image src={header.logoImagePath} alt='Cairos logo' width={200} height={43}/>
                <span className="sr-only">Cairos</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                { Object.entries(header.navigation).map(([key, value]) => (
                    <Link
                        key={key}
                        href={value.url}
                        className="text-sm font-medium hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        {value.label}
                    </Link>
                )) }
                <Link href="/login" prefetch={false}>
                    <Button>
                        Увійти
                    </Button>
                </Link>
            </nav>
        </header>
    );
}

export default LandingHeader;