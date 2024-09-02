import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ExternalLink} from "lucide-react";

function CairosTelegram() {
    return (
        <Link href='https://t.me/radichcairos'>
            <Button variant="outline" className="w-full">
                <div className="inside-button">
                    <p>Радіч - Час Каіросу</p>
                    <ExternalLink size={15}/>
                </div>
            </Button>
        </Link>
    );
}

export default CairosTelegram;