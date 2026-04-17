import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Contato } from "./entities/contato.entity";

@Injectable()
export class ContatoService {
    constructor(
        @InjectRepository(Contato)
        private contatoRepository: Repository<Contato>
    ) { }

    async findAll(): Promise<Contato[]> {
        return await this.contatoRepository.find({
            relations: {
                usuario: true,
                cliente: true
            }
        });
    }

    async findById(id: number): Promise<Contato> {
        let contato = await this.contatoRepository.findOne({
            where: { id },
            relations: {
                usuario: true,
                cliente: true
            }
        });

        if (!contato)
            throw new HttpException('Contato não encontrado!', HttpStatus.NOT_FOUND);

        return contato;
    }

    async create(contato: Contato): Promise<Contato> {
        return await this.contatoRepository.save(contato);
    }

    async update(contato: Contato): Promise<Contato> {
        await this.findById(contato.id);
        return await this.contatoRepository.save(contato);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.contatoRepository.delete(id);
    }
}