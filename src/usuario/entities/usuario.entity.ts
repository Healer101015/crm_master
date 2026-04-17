import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contato } from "../../contato/entities/contato.entity";

@Entity({ name: "tb_usuarios" })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, unique: true, nullable: false })
    email: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string;

    @CreateDateColumn()
    createdAt: Date;

    // Aqui fazemos a ligação! Um usuário pode ter vários contatos.
    @OneToMany(() => Contato, (contato) => contato.usuario)
    contato: Contato[];
}