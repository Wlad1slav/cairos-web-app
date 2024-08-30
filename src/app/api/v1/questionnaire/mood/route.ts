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

    const profileToFind = { email: session.user.email };

    try {
        const {happinessValue, recentActivity} = await request.json();

        const profile = await Profile.findOne(profileToFind);

        // Checking whether objects already exist for the corresponding arrays today.
        // If they exist, they are not added to the array
        const today = new Date().setHours(0,0,0,0);

        const lastHappiness = profile.happiness?.slice(-1)[0];
        const lastRecentAction = profile.recentActions?.slice(-1)[0];

        const happiness = lastHappiness && new Date(lastHappiness.date).setHours(0, 0, 0, 0) === today
            ? undefined
            : { level: happinessValue, date: new Date() };

        const recentActions = lastRecentAction && new Date(lastRecentAction.date).setHours(0, 0, 0, 0) === today
            ? undefined
            : { action: recentActivity, date: new Date() };

        await Profile.updateOne(
            profileToFind,
            {
                $push: { happiness, recentActions }
            }
        );

        return NextResponse.json({ message: 'Mood stored' }, { status: 201 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: e || 'Internal server error' }, { status: 500 });
    }
}
