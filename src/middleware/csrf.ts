import { NextRequest, NextResponse } from 'next/server';
import { createCSRFToken, verifyCSRFToken } from '@/lib/utils/csrf';
import {csrfError} from "@/lib/constants";

export function csrfMiddleware(req: NextRequest) {
    const csrfToken = req.headers.get('x-csrf-token');

    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        if (!csrfToken || !verifyCSRFToken(csrfToken)) {
            return NextResponse.json(csrfError, { status: 403 });
        }
    }

    // Add a CSRF token to the cookie for GET requests
    if (req.method === 'GET') {
        const token = createCSRFToken();
        const response = NextResponse.json({});
        response.cookies.set('csrf-token', token);
        return response;
    }

    return NextResponse.json({});
}
