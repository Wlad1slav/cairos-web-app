import Link from "next/link";
import Image from "next/image";
import {header} from "@/config/landing.config";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetHeader, SheetTrigger,} from "@/components/ui/sheet"
import {Ellipsis} from "lucide-react";
import InstallPWAButton from "@/components/buttons/install-pwa";

function LandingHeader() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link href="/" className="flex items-center justify-center" prefetch={false}>
                <Image src={header.logoImagePath} alt='Cairos logo' width={200} height={43}/>
                <span className="sr-only">Cairos</span>
            </Link>
            <nav className="ml-auto gap-4 sm:gap-6 items-center hidden sm:flex">
                {Object.entries(header.navigation).map(([key, value]) => (
                    <Link
                        key={key}
                        href={value.url}
                        className="text-sm font-medium hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        {value.label}
                    </Link>
                ))}
                <div className="space-x-2">
                    <Link href="/login" prefetch={false}>
                        <Button variant="outline">
                            Увійти
                        </Button>
                    </Link>
                    <InstallPWAButton />
                </div>
            </nav>
            <div className="sm:hidden flex w-full justify-end">
                <Sheet>
                    <SheetTrigger>
                        <Ellipsis size={36}/>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            {Object.entries(header.navigation).map(([key, value]) => (
                                <Link
                                    key={key}
                                    href={value.url}
                                    prefetch={false}
                                >
                                    <Button variant="outline" className="w-full">
                                        {value.label}
                                    </Button>
                                </Link>
                            ))}
                            <Link href="/login" prefetch={false}>
                                <Button className="w-full" variant="outline">
                                    Увійти
                                </Button>
                            </Link>
                            <InstallPWAButton />
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default LandingHeader;
