import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {noSessionError} from "@/lib/constants";

export function authMiddleware(session: Session | null) {
    if (!session || !session.user) {
        return NextResponse.json(noSessionError, {status: 401}); // Return an error if the session is not found or the user is not authenticated
    }

    return NextResponse.json({});
}