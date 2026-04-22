import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contato } from "../../contato/entities/contato.entity";

@Entity({ name: "tb_usuarios" })
export class Usuario {
    @ApiProperty({ example: 1, description: 'ID do usuário (gerado automaticamente)' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'João Henrique Brito', description: 'Nome completo do usuário' })
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string;

    @ApiProperty({ example: 'joao.brito@email.com', description: 'E-mail de acesso' })
    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, unique: true, nullable: false })
    email: string;

    @ApiProperty({ example: 'senhaSuperForte123', description: 'Senha de acesso' })
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string;

    @ApiProperty({ example: '2026-04-22T14:33:00.000Z', description: 'Data de criação' })
    @CreateDateColumn()
    createdAt: Date;

    // Aqui fazemos a ligação! Um usuário pode ter vários contatos.
    @OneToMany(() => Contato, (contato) => contato.usuario)
    contato: Contato[];
}