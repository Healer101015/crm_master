import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContatoController } from "./contato.controller";
import { Contato } from "./entities/contato.entity";
import { ContatoService } from "./contato.service";

@Module({
    imports: [TypeOrmModule.forFeature([Contato])],
    providers: [ContatoService],
    controllers: [ContatoController],
    exports: [TypeOrmModule] // Exportamos caso outro módulo precise usar o repositório de contatos futuramente
})
export class ContatoModule { }