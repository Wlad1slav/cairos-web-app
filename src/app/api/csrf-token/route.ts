import {NextRequest} from "next/server";
import {csrfMiddleware} from "@/middleware/csrf";

export async function GET(request: NextRequest) {
    const middlewareResponse = csrfMiddleware(request);
    if (middlewareResponse) {
        return middlewareResponse;
    }
}