import {NextRequest, NextResponse} from "next/server";
import {csrfMiddleware} from "@/middleware/csrf";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {authMiddleware} from "@/middleware/auth";
import {Reflexive} from "@/lib/models/reflexive.schema";
import {Profile} from "@/lib/models";
import reflexiveLocal from "@/lib/constants/reflexive";

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

    const today = new Date().setHours(0, 0, 0, 0);

    try {
        const {type} = await request.json();

        const reflexive = await Reflexive.aggregate([
            {
                // Filters documents by type and week day
                $match: {
                    type: reflexiveLocal[type],
                    day: new Date().getDay()
                }
            },
            {$sample: {size: 1}} // Selects one random document
        ]);

        await Profile.updateOne(
            {email: session?.user?.email},
            {
                $set: {
                    [`reflexive.${today}.${type}`]: reflexive[0]._id,
                }
            }
        );

        return NextResponse.json({reflexive: reflexive[0]}, {status: 201});

    } catch (e) {
        console.error(e);
        return NextResponse.json({message: e}, {status: 500});
    }

}