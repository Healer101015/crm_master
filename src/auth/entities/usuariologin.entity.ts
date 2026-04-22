import { ApiProperty } from "@nestjs/swagger";

export class UsuarioLogin {
    @ApiProperty({
        example: 'joao.brito@email.com',
        description: 'E-mail registrado pelo usuário'
    })
    public usuario: string;

    @ApiProperty({
        example: 'senhaSuperForte123',
        description: 'Senha de acesso do usuário'
    })
    public senha: string;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'Token JWT (retornado após o login com sucesso)'
    })
    public token: string;
}