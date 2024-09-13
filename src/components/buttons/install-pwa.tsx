'use client'

import { useEffect, useState } from 'react';
import {Button} from "@/components/ui/button";
import {Download} from "lucide-react";

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
        const choiceResult = await deferredPrompt.userChoice; // Waiting for user response
        // Clears the saved event
        setDeferredPrompt(null);
        setIsInstallable(false);
    };

    return (
        <>
            <Button onClick={handleInstallClick} className="w-100" disabled={!isInstallable}>
                <span className="flex items-center justify-between w-full px-4">
                    <Download fill="white" width={24} height={24} />
                    <span className="flex-1">Встановити додаток</span>
                </span>
            </Button>
        </>
    );
}
