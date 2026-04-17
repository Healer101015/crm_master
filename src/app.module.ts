import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { ClienteModule } from './cliente/cliente.module';
import { ContatoModule } from './contato/contato.module';
import { AuthModule } from './auth/auth.module';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: process.env.NODE_ENV === 'production' ? ProdService : DevService,
      inject: [ProdService, DevService],
    }),
    UsuarioModule,
    ClienteModule,
    ContatoModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }