import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Contato } from "../../contato/entities/contato.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'JOAO@123',
            database: 'db_blogpessoal', // Pode mudar o nome da base de dados no futuro se desejar
            entities: [Cliente, Contato, Usuario],
            synchronize: true,
        };
    }
}