import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE, HOST, PASSWORD } from './config/constans';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mssql',
      host: '18.168.10.231',
      port: 1093,
      username: 'Flotex2022',
      password: "P9?9og32g",
      database: "flotexpe_DB",
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      logger: 'file',
      options: {
        encrypt: false,
        
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
        },
      },
    }), UserModule, 
  ],
 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
