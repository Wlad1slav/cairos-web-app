import Link from "next/link"
import {contactLinks, header} from "@/config/landing.config";
import SubscribeForm from "@/components/landing/subscribe-form";

export default function ContactPage() {
    return (
        <div className="w-full max-w-5xl mx-auto py-12 md:py-24 min-h-[100dvh]">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="/assets/images/alex_radich.webp"
                        width={400}
                        height={400}
                        alt="Founder"
                        className="rounded-full w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
                        style={{aspectRatio: "400/400", objectFit: "cover"}}
                    />
                    <div className="mt-6 text-center">
                        <h1 className="text-2xl font-bold">Олександр Радіч</h1>
                        <p className="mt-4 text-muted-foreground">
                            Директор з зовнішніх комунікацій та представник в Україні Western Bid. Діджітал ️
                            підприємець з 2001. БІзнес тренер.
                        </p>
                    </div>
                </div>
                <div className="grid gap-4">
                    {contactLinks.map(link => (
                        <Link
                            key={link.label}
                            href={link.url}
                            className="flex items-center gap-3 bg-muted px-4 py-3 rounded-lg hover:bg-muted/80 transition-colors"
                            prefetch={false}
                        >
                            <link.icon className="h-6 w-6" color={link.color}/>
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}