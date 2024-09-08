import HomeLayout from "@/app/home/layout";
import TermPage from "@/app/home/policies/term/page";
import PrivacyPage from "@/app/home/policies/privacy/page";

export default function MainPrivacyPage() {
    return (
        <HomeLayout>
            <PrivacyPage />
        </HomeLayout>
    )
}