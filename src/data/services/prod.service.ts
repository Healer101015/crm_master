import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Contato } from "../../contato/entities/contato.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            logging: false,
            dropSchema: false,
            ssl: {
                rejectUnauthorized: false,
            },
            synchronize: true,
            // Adicionamos as entidades explicitamente aqui também por segurança
            entities: [Cliente, Contato, Usuario],
        };
    }
}