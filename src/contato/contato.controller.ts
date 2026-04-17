import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ContatoService } from "./contato.service";
import { Contato } from "./entities/contato.entity";

@ApiTags('Contatos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("/contatos")
export class ContatoController {
    constructor(private readonly contatoService: ContatoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Contato[]> {
        return this.contatoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Contato> {
        return this.contatoService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() contato: Contato): Promise<Contato> {
        return this.contatoService.create(contato);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() contato: Contato): Promise<Contato> {
        return this.contatoService.update(contato);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.contatoService.delete(id);
    }
}