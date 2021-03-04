import { forwardRef, Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => UserModule), TokenModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
