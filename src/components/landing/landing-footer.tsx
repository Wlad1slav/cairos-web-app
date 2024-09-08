import Link from "next/link";

function LandingFooter() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Cairos. Усі права
                захищені.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link href="/policies/term" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                    Умови надання послуг
                </Link>
                <Link href="/policies/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                    Політика конфіденційності
                </Link>
            </nav>
        </footer>
    );
}

export default LandingFooter;