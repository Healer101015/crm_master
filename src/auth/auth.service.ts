import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    async validateUser(usuario: string, senha: string): Promise<any> {
        // Busca o utilizador na base de dados pelo email
        const buscaUsuario = await this.usuarioService.findByUsuario(usuario);

        if (buscaUsuario) {
            const senhasConferem = await bcrypt.compare(senha, buscaUsuario.senha);
            if (senhasConferem) {
                return buscaUsuario;
            }
        }

        return null;
    }

    async login(user: any) {
        // O payload do JWT agora usa o email como identificador principal
        const payload = { username: user.email, sub: user.id };

        return {
            id: user.id,
            nome: user.nome,
            email: user.email, // Corrigido de "usuario" para "email" (baseado na sua entidade)
            token: this.jwtService.sign(payload),
        };
    }
}