import {EmailIcon, FacebookLogo, GithubLogo, LinkedinLogo, TelegramLogo, YoutubeLogo} from "@/components/icons";

const telegramUrl = 'https://t.me/radichcairos';
const linkedinUrl = 'https://www.linkedin.com/in/oleksandr-radich';
const email = 'radich74@gmail.com';

export const header = {
    logoImagePath: '/assets/images/logo.webp',
    navigation: {
        contact: {
            label: 'Зв\'язатися з нами',
            url: '/contact',
        },
        telegram: {
            label: 'Радіч - Час Каіросу',
            url: telegramUrl,
        },
    },
    networks: {
        telegram: {
            url: telegramUrl,
            Icon: TelegramLogo
        },
        linkedin: {
            url: linkedinUrl,
            Icon: LinkedinLogo
        },
        github: {
            url: 'https://github.com/Wlad1slav',
            Icon: GithubLogo
        },
    }
};

export const landingMetadata = {
    title: 'Каірос — Додаток для саморозвитку',
    description: 'Додаток саморозвитку. Шедевр кожного дня через яскраві звички в креативності, фінансах, розвитку розуму, тіла та відносин.',
};

export const contactLinks = [
    { url: telegramUrl, label: 'Telegram', icon: TelegramLogo, color: '#2799D4' },
    { url: linkedinUrl, label: 'LinkedIn', icon: LinkedinLogo, color: '#0A66C2' },
    { url: 'https://www.facebook.com/alexander.radich.9/', label: 'Facebook', icon: FacebookLogo, color: '#415CA0' },
    { url: `mailto:${email}`, label: email, icon: EmailIcon, color: 'currentColor' },
    { url: 'https://www.youtube.com/@AlexRad1974', label: 'YouTube', icon: YoutubeLogo, color: '#FF0000' },
];
