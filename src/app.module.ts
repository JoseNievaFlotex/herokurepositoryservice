import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE, HOST, PASSWORD } from './config/constans';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'mssql',
      host: config.get(HOST),
      username: 'RETAILUSER',
      password: config.get(PASSWORD),
      database: config.get(DATABASE),
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      trustServerCertificate: true,
      logger: 'file',
      options: {
        encrypt: false,
        
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
        },
      },
    }),
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
