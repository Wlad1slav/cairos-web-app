import {NextRequest, NextResponse} from "next/server";
import {csrfMiddleware} from "@/middleware/csrf";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {authMiddleware} from "@/middleware/auth";
import {Reflexive} from "@/lib/models/reflexive.schema";
import {Profile} from "@/lib/models";
import {adminMiddleware} from "@/middleware/admin";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);

    // Pagination settings
    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = 30;
    const skip = (page - 1) * pageSize;

    // Setting query to the database
    const type = url.searchParams.get('type');
    const query = type ? { type } : {};

    try {
        const reflexives = await Reflexive
            .find(query)
            .skip(skip)
            .limit(pageSize)
            .exec();

        // Total number of pages for pagination
        const total = await Reflexive.countDocuments().exec();
        const totalPages = Math.ceil(total / pageSize);

        return NextResponse.json({ reflexives, totalPages });
    } catch (e) {
        return NextResponse.json({ message: e }, { status: 500 });
    }
}

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

    const profile = await Profile.findOne({ email: session?.user?.email });
    const middlewareAdminResponse = adminMiddleware(profile);
    if (middlewareAdminResponse.status === 403) {
        return middlewareAuthResponse;
    }

    try {
        const {text, imageUrl, day, type} = await request.json();
        const res = await Reflexive.create({text, imageUrl, day, type});
        return NextResponse.json({ message: res });
    } catch (e) {
        return NextResponse.json({ message: e }, { status: 500 });
    }
}