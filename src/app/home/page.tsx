import Link from "next/link"
import Image from "next/image";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {Chrome, HeartPulseIcon, HourglassIcon, SmileIcon} from "lucide-react";
import {header} from "@/config/landing.config";
import SubscribeForm from "@/components/landing/subscribe-form";
import InstallPWAButton from "@/components/buttons/install-pwa";
import {Button} from "@/components/ui/button";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Живіть 100 років разом із Каірос
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Досягайте щасливого, здорового способу життя та живіть найкращим життям.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <a
                                        href="#getStart"
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        Почати
                                    </a>
                                </div>
                            </div>
                            <img
                                src="/assets/images/landing_image.webp"
                                alt="Hero"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                                width="550"
                                height="550"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <SmileIcon className="h-12 w-12 text-primary"/>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Щастя</h3>
                                    <p className="text-muted-foreground">
                                        Дізнайтеся, як культивувати радість, задоволення та виконаність у повсякденному
                                        житті.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <HeartPulseIcon className="h-12 w-12" color="#648B7E"/>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Здоровий спосіб життя</h3>
                                    <p className="text-muted-foreground">
                                        Дізнайтеся перевірені стратегії для покращення фізичного та психічного
                                        здоров&apos;я.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <HourglassIcon className="h-12 w-12" color="#496995"/>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Довголіття</h3>
                                    <p className="text-muted-foreground">Розкрийте секрети довгого, повноцінного
                                        життя.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32" id="getStart">
                    <div className="container px-4 md:px-6">
                        <div className="mx-auto max-w-md space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Завантажте наш
                                    додаток</h2>
                                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Отримайте додаток Cairos у Google Play або увійдіть через браузер.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 justify-center">
                                <InstallPWAButton/>
                                <Link href="/mobile/android/Каірос.apk" className="w-full">
                                    <span
                                        className="flex items-center h-10 rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none"
                                    >
                                        <Image
                                            src="/assets/images/android_841.webp"
                                            alt="Andorid logo"
                                            width={24} height={24}
                                        />
                                        <span className="flex-1">Завантажити для Android</span>
                                    </span>
                                </Link>
                                {/*<Link href="/mobile/android/Каірос.apk" className="w-full sm:opacity-50 sm:cursor-auto">*/}
                                {/*    <span*/}
                                {/*        className="flex items-center h-10 rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none"*/}
                                {/*    >*/}
                                {/*        <Image*/}
                                {/*            src="/assets/images/apple_logo.webp"*/}
                                {/*            alt="IOS logo"*/}
                                {/*            width={24} height={24}*/}
                                {/*        />*/}
                                {/*        <span className="flex-1">Завантажити для IOS</span>*/}
                                {/*    </span>*/}
                                {/*</Link>*/}
                                <Link href="/login" className="w-full">
                                    <span
                                        className="flex items-center h-10 rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none"
                                    >
                                        <Chrome color="white" fill="#496993" />
                                        <span className="flex-1">Увійти через браузер</span>
                                    </span>
                                </Link>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                                {/*<Link*/}
                                {/*    href="/"*/}
                                {/*    className="w-full inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"*/}
                                {/*    prefetch={false}*/}
                                {/*>*/}
                                {/*    <span className="inside-button">*/}
                                {/*        <Image src="/assets/images/gp.webp" alt="Google play logo" width={24}*/}
                                {/*               height={24}/>*/}
                                {/*        Google Play*/}
                                {/*    </span>*/}
                                {/*</Link>*/}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger disabled={true} className="disabled:opacity-50 w-full">
                                            <span
                                                className="inside-button inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none">
                                                    <Image src="/assets/images/gp.webp" alt="App store logo"
                                                           width={24} height={24}/>
                                                    Google Play
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Скоро буде</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger disabled={true} className="disabled:opacity-50 w-full">
                                                <span
                                                    className="inside-button inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none">
                                                    <Image src="/assets/images/app_store.webp" alt="App store logo"
                                                           width={24} height={24}/>
                                                    App Store
                                                </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Скоро буде</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            </div>

                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="mx-auto max-w-md space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Приєднуйтесь до
                                    нашої спільноти</h2>
                                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Підпишіться на нашу розсилку, щоб отримувати актуальні поради та ресурси для
                                    найкращого життя.
                                </p>
                            </div>
                            <SubscribeForm/>
                            <div className="flex justify-center gap-4">
                                {Object.entries(header.networks).map(([key, value]) => (
                                    <Link key={key} href={value.url}
                                          className="text-muted-foreground hover:text-primary" prefetch={false}>
                                        <value.Icon className="h-6 w-6"/>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
