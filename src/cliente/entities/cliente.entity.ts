import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contato } from "../../contato/entities/contato.entity";

@Entity({ name: "tb_clientes" })
export class Cliente {
  @ApiProperty({ example: 1, description: 'ID do cliente (gerado automaticamente)' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Carlos Silva', description: 'Nome do cliente ou responsável' })
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @ApiProperty({ example: 'Tech Solutions Lda', description: 'Nome da empresa' })
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  empresa: string;

  @ApiProperty({ example: '+351 912 345 678', description: 'Número de telefone de contacto' })
  @IsNotEmpty()
  @Column({ length: 20, nullable: false })
  telefone: string;

  @ApiProperty({ example: 'carlos.silva@techsolutions.com', description: 'E-mail principal do cliente' })
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  email: string;

  // Novo campo: Inicia sempre como falso por padrão
  @ApiProperty({
    example: true,
    description: 'Define se o cliente representa uma oportunidade de negócio ativa',
    default: false,
    required: false
  })
  @IsOptional()
  @Column({ type: "boolean", default: false })
  statusOportunidade: boolean;

  @ApiProperty({ type: () => Contato, isArray: true, description: 'Lista de contactos associados a este cliente' })
  @OneToMany(() => Contato, (contato) => contato.cliente)
  contato: Contato[];
}