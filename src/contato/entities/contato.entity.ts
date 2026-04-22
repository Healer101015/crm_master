import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: "tb_contatos" })
export class Contato {
    @ApiProperty({ example: 1, description: 'ID do registo de contacto' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Reunião inicial realizada para alinhamento de requisitos do novo projeto.',
        description: 'Descrição ou resumo da interação com o cliente'
    })
    @IsNotEmpty()
    @Column({ type: "text", nullable: false })
    descricao: string;

    @ApiProperty({ example: '2026-04-22T14:35:00.000Z', description: 'Data e hora em que o contacto foi registado' })
    @CreateDateColumn()
    dataContato: Date;

    @ApiProperty({ type: () => Usuario, description: 'Utilizador do sistema que registou o contacto' })
    @ManyToOne(() => Usuario, (usuario) => usuario.contato, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;

    @ApiProperty({ type: () => Cliente, description: 'Cliente com o qual o contacto foi realizado' })
    @ManyToOne(() => Cliente, (cliente) => cliente.contato, {
        onDelete: "CASCADE"
    })
    cliente: Cliente;
}