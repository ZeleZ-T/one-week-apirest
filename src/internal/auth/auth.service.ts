import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, password: string): Promise<string | UnauthorizedException> {
        const user = await this.userService.findOne(email);
        const bcrypt = require('bcrypt');
        let hashPass: string = await this.userService.hashPassword(password);

        return bcrypt.compare(user?.password, hashPass) ?
            this.jwtService.sign({ email: email }) :
            new UnauthorizedException();
    }
}
