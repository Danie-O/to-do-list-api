/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(username: string, plainPassword: string) {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
          throw new Error('Invalid credentials - User not found');
        }

        const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }
      
        const payload = { username: user.username, sub: user.id };
        return { access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }) };
    }
    
    async register(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.createUser(username, hashedPassword);
    }
}
