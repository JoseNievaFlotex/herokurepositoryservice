import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { jwtConstants } from './user/jwtConstants';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.use(
    session({
      secret: jwtConstants.secret,
      resave:false,
      cookie: {maxAge: 3600000},
    }),
  );
  app.enableCors({
    credentials: true
  })
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
