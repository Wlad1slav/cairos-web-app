import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {NextRequest, NextResponse} from "next/server";
import {noSessionError} from "@/lib/constants";
import {Profile} from "@/lib/models";
import {csrfMiddleware} from "@/middleware/csrf";
import {authMiddleware} from "@/middleware/auth";


/**
 * # Handles POST requests.
 */
export async function POST(request: NextRequest) {

    const middlewareResponse = csrfMiddleware(request);
    if (middlewareResponse.status === 403) {
        return middlewareResponse;
    }

    const session = await getServerSession(authOptions);
    const middlewareAuthResponse = authMiddleware(session);
    if (middlewareAuthResponse.status === 401) {
        return middlewareAuthResponse;
    }

    const today = new Date().setHours(0,0,0,0);

    try {
        const {happinessValue, recentActivity} = await request.json();

        await Profile.updateOne(
            { email: session?.user?.email },
            {
                $set: {
                    [`happiness.${today}`]: happinessValue,
                    [`recentActions.${today}`]: recentActivity,
                    [`questionnaire.${today}.mood`]: true, // Note that today's stage has been completed
                }
            }
        );

        return NextResponse.json({ message: 'Mood stored' }, { status: 201 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: e || 'Internal server error' }, { status: 500 });
    }
}
