import {NextRequest, NextResponse} from "next/server";
import {csrfMiddleware} from "@/middleware/csrf";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {authMiddleware} from "@/middleware/auth";
import {Reflexive} from "@/lib/models/reflexive.schema";

export async function POST(request: NextRequest) {
    const middlewareCsrfResponse = csrfMiddleware(request);
    if (middlewareCsrfResponse.status === 403) {
        return middlewareCsrfResponse;
    }

    const session = await getServerSession(authOptions);
    const middlewareAuthResponse = authMiddleware(session);
    if (middlewareAuthResponse.status === 401) {
        return middlewareAuthResponse;
    }

    try {
        const {text, imageUrl, day, type} = await request.json();
        const res = await Reflexive.create({text, imageUrl, day, type});
        return NextResponse.json({ message: res });
    } catch (e) {
        return NextResponse.json({ message: e }, { status: 500 });
    }
}