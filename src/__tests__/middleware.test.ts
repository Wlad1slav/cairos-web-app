/**
 * @jest-environment node
 */

import {authMiddleware} from "@/middleware/auth";
import {Session} from "next-auth";
import {createCSRFToken, verifyCSRFToken} from "@/lib/utils/csrf";
import {NextRequest, NextResponse} from "next/server";
import {csrfMiddleware} from "@/middleware/csrf";
import {csrfError} from "@/lib/constants";
import {adminMiddleware} from "@/middleware/admin";
import {TProfile} from "@/lib/models";

jest.mock('../lib/utils/csrf', () => ({
    createCSRFToken: jest.fn(),
    verifyCSRFToken: jest.fn(),
}));

const defaultSession: Session = {
    user: {
        email: 'test@test.com',
    },
    expires: new Date().toString()
};

const invalidSession = null;

describe("Middleware Tests", () => {
    describe("authMiddleware", () => {
        it("should return a 401 status because the user is not authorized (invalid session)", () => {
            const response = authMiddleware(invalidSession);
            expect(response.status).toBe(401);
        });

        it("should return a status of 200 because the user is authorized (valid session)", () => {
            const response = authMiddleware(defaultSession);
            expect(response.status).toBe(200);
        });
    });

    describe("adminMiddleware", () => {
        it("should return a 403 status because the user is not admin", () => {
            const profile = {
                isAdmin: false
            };
            const response = adminMiddleware(profile as TProfile);
            expect(response.status).toBe(403);
        });

        it("should return a status of 200 because the user is admin", () => {
            const profile = {
                isAdmin: true
            };
            const response = adminMiddleware(profile as TProfile);
            expect(response.status).toBe(200);
        });
    });

    describe('csrfMiddleware', () => {
        let req: NextRequest;
        let jsonSpy: jest.SpyInstance;

        beforeEach(() => {
            jsonSpy = jest.spyOn(NextResponse, 'json');
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return 403 if CSRF token is missing on POST, PUT, DELETE requests', () => {
            req = new NextRequest(new Request('http://localhost', { method: 'POST' }));
            const response = csrfMiddleware(req);

            expect(jsonSpy).toHaveBeenCalledWith(csrfError, { status: 403 });
            expect(response.status).toBe(403);
        });

        it('should return 403 if CSRF token is invalid on POST, PUT, DELETE requests', () => {
            (verifyCSRFToken as jest.Mock).mockReturnValue(false);
            req = new NextRequest(new Request('http://localhost', {
                method: 'POST',
                headers: {
                    'x-csrf-token': 'invalid-token',
                },
            }));
            const response = csrfMiddleware(req);

            expect(jsonSpy).toHaveBeenCalledWith(csrfError, { status: 403 });
            expect(response.status).toBe(403);
        });

        it('should allow POST, PUT, DELETE requests if CSRF token is valid', () => {
            (verifyCSRFToken as jest.Mock).mockReturnValue(true);
            req = new NextRequest(new Request('http://localhost', {
                method: 'POST',
                headers: {
                    'x-csrf-token': 'valid-token',
                },
            }));
            const response = csrfMiddleware(req);

            expect(jsonSpy).toHaveBeenCalledWith({});
            expect(response.status).toBe(200);
        });

        it('should add a CSRF token to cookies for GET requests', () => {
            const mockToken = 'csrf-token-123';
            (createCSRFToken as jest.Mock).mockReturnValue(mockToken);
            req = new NextRequest(new Request('http://localhost', { method: 'GET' }));
            const response = csrfMiddleware(req);

            expect(jsonSpy).toHaveBeenCalledWith({});
            expect(response.cookies.get('csrf-token')?.value).toEqual(mockToken);
            expect(response.status).toBe(200);
        });
    });
});