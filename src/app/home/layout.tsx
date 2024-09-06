import LandingHeader from "@/components/landing/landing-header";

export default function HomeLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <LandingHeader />
            {children}
        </main>
    );
}
