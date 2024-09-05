import {NextResponse} from "next/server";
import {noAdminRightsError} from "@/lib/constants";
import {TProfile} from "@/lib/models";

export function adminMiddleware(profile: TProfile | null) {
    if (!profile || !profile.isAdmin) {
        return NextResponse.json(noAdminRightsError, {status: 403});
    }

    return NextResponse.json({});
}