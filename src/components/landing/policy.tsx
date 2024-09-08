import {PolicyProps} from "@/lib/types";

function Policy({policies}: PolicyProps) {
    return policies.map(point => (
        <div key={point.heading} className="space-y-2.5">
            <h2 className="text-2xl font-bold mb-4">{point.heading}</h2>
            {point.content.map((text, index) => (
                <p key={index} className="text-muted-foreground">
                    {text}
                </p>
            ))}
        </div>
    ));
}

export default Policy;