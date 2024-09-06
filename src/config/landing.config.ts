import {GithubLogo, LinkedinLogo, TelegramLogo} from "@/components/icons";

export const header = {
    logoImagePath: '/assets/images/logo.webp',
    navigation: {
        contact: {
            label: 'Зв\'язатися з нами',
            url: '/contact',
        },
        telegram: {
            label: 'Радіч - Час Каіросу',
            url: 'https://t.me/radichcairos',
        },
    },
    networks: {
        telegram: {
            url: 'https://t.me/radichcairos',
            Icon: TelegramLogo
        },
        linkedin: {
            url: 'https://www.linkedin.com/in/oleksandr-radich',
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