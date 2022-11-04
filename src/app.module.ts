import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE, HOST, PASSWORD } from './config/constans';

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
      synchronize: false,
      logging: true,
      logger: 'file',
      options: {
        encrypt: false,
        
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
        },
      },
    }),
  ],
 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
