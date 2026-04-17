import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: { email: usuario },
            relations: { contato: true },
        });
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: { contato: true },
        });
    }

    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: { contato: true },
        });

        if (!usuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        const buscaUsuario = await this.findByUsuario(usuario.email);

        if (!buscaUsuario) {
            usuario.senha = await this.hashSenha(usuario.senha);
            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST);
    }

    async update(usuario: Usuario): Promise<Usuario> {
        const updateUsuario: Usuario = await this.findById(usuario.id);
        const buscaUsuario = await this.findByUsuario(usuario.email);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (E-mail) já cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.hashSenha(usuario.senha);
        return await this.usuarioRepository.save(usuario);
    }

    private async hashSenha(senha: string): Promise<string> {
        const salt = 10;
        return await bcrypt.hash(senha, salt);
    }
}