import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import {NextRequest, NextResponse} from "next/server";
import { noSessionError } from "@/lib/constants";
import {Profile} from "@/lib/models";
import {csrfMiddleware} from "@/middleware/csrf";

/**
 * # Handles GET requests.
 *
 * Retrieves the user session using NextAuth and fetches the corresponding user profile from the database.
 * If the session is not found, it returns an error response. Otherwise, it returns the session and profile data as JSON.
 */
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(noSessionError); // Return an error if the session is not found
    }

    const profile = await Profile.findOne({ email: session.user?.email });

    return NextResponse.json({ session, profile });
}

/**
 * # Handles POST requests.
 *
 * Retrieves the user session using NextAuth and attempts to find or create a corresponding user profile in the database.
 * If the session is not found or the user is not authenticated, it returns an error response.
 */
export async function POST(request: NextRequest) {

    const middlewareResponse = csrfMiddleware(request);
    if (middlewareResponse.status === 403) {
        return middlewareResponse;
    }

    // Fetch the session using NextAuth
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(noSessionError, {status: 401}); // Return an error if the session is not found or the user is not authenticated
    }

    // Create user profile
    try {
        const existingProfile = await Profile.findOne({ email: session.user.email });
        if (existingProfile) {
            return NextResponse.json({ session, profile: existingProfile }); // Return the session & EXISTING profile data
        }

        const profile = new Profile({email: session.user.email});
        return NextResponse.json({ session, profile: profile.save() }); // Return the session & CREATED profile data
    } catch (e) {
        console.error(e);
    }
}
