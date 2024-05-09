import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Global() // Set global scope
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'thisshouldbeasecret',
      signOptions: { expiresIn: '1440s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
