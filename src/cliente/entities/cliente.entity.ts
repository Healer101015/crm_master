import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contato } from "../../contato/entities/contato.entity";

@Entity({ name: "tb_clientes" })
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  empresa: string;

  @IsNotEmpty()
  @Column({ length: 20, nullable: false })
  telefone: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  email: string;

  @OneToMany(() => Contato, (contato) => contato.cliente)
  contato: Contato[];
}