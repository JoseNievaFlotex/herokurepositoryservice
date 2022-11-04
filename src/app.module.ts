import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE, HOST, PASSWORD } from './config/constans';

@Module({
  imports: [TypeOrmModule.forRoot({
  
  
      type: 'mssql',
      host: '172.16.1.206',
      username: 'RETAILUSER',
      password: 'retail',
      database: 'DBFLOTEX2022',
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
