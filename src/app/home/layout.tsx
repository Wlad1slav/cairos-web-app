import LandingHeader from "@/components/landing/landing-header";
import LandingFooter from "@/components/landing/landing-footer";

export default function HomeLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <LandingHeader />
            {children}
            <LandingFooter />
        </main>
    );
}
