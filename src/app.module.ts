import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './authguard/jwt.strategy';
import { secret } from './user/constants/user.constent';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Register Passport with the JWT strategy as default
    JwtModule.register({
      secret: secret, // Replace with your JWT secret key
      signOptions: { expiresIn: '1h' }, // Set token expiration as needed
    }),
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    AuthModule,
    ExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
