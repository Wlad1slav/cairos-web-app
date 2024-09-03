import csrf from 'csrf';

const tokens = new csrf();

export function createCSRFToken() {
    return tokens.create(process.env.CSRF_SECRET || 'default-secret');
}

export function verifyCSRFToken(token: string) {
    return tokens.verify(process.env.CSRF_SECRET || 'default-secret', token);
}