'use client'

import { useEffect, useState } from 'react';
import {Button} from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string[] }>;
}

export default function InstallPWAButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setDeferredPrompt(e); // Saves the event for later use
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt(); // Shows the installation dialog
        const choiceResult = await deferredPrompt.userChoice; // Очікує відповідь користувача
        if (choiceResult.outcome === 'accepted') {
            console.log('Користувач прийняв встановлення PWA');
        } else {
            console.log('Користувач відхилив встановлення PWA');
        }
        // Clears the saved event
        setDeferredPrompt(null);
        setIsInstallable(false);
    };

    return (
        <>
            <Button onClick={handleInstallClick} className="w-100" disabled={!isInstallable}>
                Встановити додаток
            </Button>
        </>
    );
}
