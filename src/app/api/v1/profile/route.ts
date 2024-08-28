import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { noSessionError } from "@/lib/constants";
import { Profile, ProfileModel } from "@/lib/models";

/**
 * # Handles GET requests.
 *
 * Retrieves the user session using NextAuth and fetches the corresponding user profile from the database.
 * If the session is not found, it returns an error response. Otherwise, it returns the session and profile data as JSON.
 */
export async function GET() {
    const session = await getServerSession(authOptions);
    const profile = await Profile.findOne({ email: session?.user?.email });

    if (!session) {
        return NextResponse.json(noSessionError); // Return an error if the session is not found
    }

    return NextResponse.json({ session, profile });
}

/**
 * # Handles POST requests.
 *
 * Retrieves the user session using NextAuth and attempts to find or create a corresponding user profile in the database.
 * If the session is not found or the user is not authenticated, it returns an error response.
 */
export async function POST() {
    // Fetch the session using NextAuth
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(noSessionError); // Return an error if the session is not found or the user is not authenticated
    }

    // Create user profile
    try {
        const profile = await Profile.findOne({ email: session.user.email });
        if (!profile) {
            // Create a new profile if it doesn't exist
            const profile = await Profile.insertOne({
                email: session.user.email
            } as ProfileModel);

            return NextResponse.json({ session, profile }); // Return the session and newly created profile data as JSON
        }
        return NextResponse.json({ session, profile }); // Return the session and existing profile data as JSON
    } catch (e) {
        console.error(e);
    }
}
