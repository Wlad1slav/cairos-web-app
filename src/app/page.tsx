import HomePage from "@/app/home/page";
import HomeLayout from "@/app/home/layout";
import {Metadata} from "next";
import {landingMetadata} from "@/config/landing.config";

export async function generateMetadata(): Promise<Metadata> {

    const metadataBase = process.env.NEXTAUTH_URL as string;

    return {
        metadataBase: new URL(metadataBase),
        title: landingMetadata.title,
        description: landingMetadata.description,
        openGraph: {
            title: landingMetadata.title,
            description: landingMetadata.description,
            images: `${metadataBase}/assets/images/landing_image.webp`,
        },
    };
}

export default function DefaultPage() {
    return (
        <HomeLayout>
            <HomePage />
        </HomeLayout>
    )
}