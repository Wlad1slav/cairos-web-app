import {privacyPolicy} from "@/config/landing.config";
import Policy from "@/components/landing/policy";

function PrivacyPage() {
    return (
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-20">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-4">Політика конфіденційності</h1>
                </div>
                <Policy policies={privacyPolicy} />
            </div>
        </div>
    );
}

export default PrivacyPage;