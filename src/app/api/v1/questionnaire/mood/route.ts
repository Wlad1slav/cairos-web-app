import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {NextResponse} from "next/server";
import {noSessionError} from "@/lib/constants";
import {Profile} from "@/lib/models";


/**
 * # Handles POST requests.
 */
export async function POST(request: Request) {
    // Fetch the session using NextAuth
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(noSessionError, {status: 401}); // Return an error if the session is not found or the user is not authenticated
    }

    const today = new Date().setHours(0,0,0,0);

    try {
        const {happinessValue, recentActivity} = await request.json();

        await Profile.updateOne(
            { email: session.user.email },
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
