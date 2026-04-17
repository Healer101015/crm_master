import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: "tb_contatos" })
export class Contato {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ type: "text", nullable: false })
    descricao: string;

    @CreateDateColumn()
    dataContato: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.contato, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;

    @ManyToOne(() => Cliente, (cliente) => cliente.contato, {
        onDelete: "CASCADE"
    })
    cliente: Cliente;
}