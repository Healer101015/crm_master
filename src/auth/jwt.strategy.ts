import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // AQUI ESTÁ A CORREÇÃO: Tem que buscar a variável do Render igual no módulo!
            secretOrKey: process.env.JWT_SECRET || 'secret',
        });
    }

    async validate(payload: any) {
        // Retorna os dados do usuário extraídos do token
        return { id: payload.sub, email: payload.username };
    }
}