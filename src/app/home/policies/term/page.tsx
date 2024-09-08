import {termsOfServices} from "@/config/landing.config";
import Policy from "@/components/landing/policy";

function TermPage() {
    return (
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-20">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-4">Умови надання послуг</h1>
                    <p className="text-muted-foreground">Останнє
                        оновлено: {new Date('9/7/2024').toLocaleDateString()}</p>
                </div>
                <Policy policies={termsOfServices} />
            </div>
        </div>
    );
}

export default TermPage;