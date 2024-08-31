import {noSessionError} from "@/lib/constants";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
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

    try {
        const {daily, cairos} = await request.json();

        // Date of completion of checklists
        const today = new Date().setHours(0,0,0,0);

        // If there is no key with today's date, then a new key is created and the array is stored on it.
        // If it exists, the list is simply updated.
        await Profile.updateOne(
            { email: session.user.email },
            {
                $set: {
                    dailyChecks: {
                        [today]: daily
                    },
                    cairosChecks: {
                        [today]: cairos
                    },
                }
            }
        );

        return NextResponse.json({ message: 'Checklists stored' }, { status: 201 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: e || 'Internal server error' }, { status: 500 });
    }
}