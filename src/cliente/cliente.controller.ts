import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ClienteService } from "./cliente.service";
import { Cliente } from "./entities/cliente.entity";

@ApiTags('Clientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("/clientes")
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
        return this.clienteService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() cliente: Cliente): Promise<Cliente> {
        return this.clienteService.create(cliente);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() cliente: Cliente): Promise<Cliente> {
        return this.clienteService.update(cliente);
    }

    // NOVO ENDPOINT: Usa Patch porque atualiza apenas um campo específico
    @Patch('/:id/oportunidade')
    @HttpCode(HttpStatus.OK)
    transformarEmOportunidade(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
        return this.clienteService.transformarEmOportunidade(id);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.clienteService.delete(id);
    }
}