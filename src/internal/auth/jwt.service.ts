export class JwtService {
    constructor(private jwt = require('jsonwebtoken')) {}

    async sign(payload: any) {
        return this.jwt.sign(payload, process.env.JWT_SECRET);
    }

    async verify(token: string, email: string): Promise<boolean> {
        const payload = this.jwt.verify(token, process.env.JWT_SECRET);
        return payload.email === email;
    }

    async decode(token: string) {
        const payload = this.jwt.verify(token, process.env.JWT_SECRET);
        return payload.email as string;
    }

    async getTokenFromHeaders(raw: string) {
        return raw.split(' ')[1];
    }
}