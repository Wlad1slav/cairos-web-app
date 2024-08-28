import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {noSessionError} from "@/lib/constants";
import {Profile} from "@/lib/models";

export async function POST(request: Request) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(noSessionError, {status: 401}); // Return an error if the session is not found or the user is not authenticated
    }

    try {
        const {birthdate} = await request.json();
        await Profile.updateOne({email: session.user.email}, { $set: { birthdate } });
        return NextResponse.json({ message: "" });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}