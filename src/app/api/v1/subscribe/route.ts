import {NextRequest, NextResponse} from "next/server";
import {csrfMiddleware} from "@/middleware/csrf";
import {Subscriber} from "@/lib/models";

/**
 * # Handles POST requests.
 */
export async function POST(request: NextRequest) {
    const middlewareResponse = csrfMiddleware(request);
    if (middlewareResponse.status === 403) {
        return middlewareResponse;
    }

    try {
        const {email} = await request.json();
        const subscriber = await Subscriber.create({email});
        await subscriber.save();
        return NextResponse.json({ message: 'Subscriber stored' }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: e || 'Internal server error' }, { status: 500 });
    }
}