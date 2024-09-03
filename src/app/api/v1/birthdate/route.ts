import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {Profile} from "@/lib/models";
import {csrfMiddleware} from "@/middleware/csrf";
import {authMiddleware} from "@/middleware/auth";

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
        const {birthdate} = await request.json();
        await Profile.updateOne({email: session?.user?.email}, { $set: { birthdate } });
        return NextResponse.json({ message: "" });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}