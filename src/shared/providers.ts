import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { TokenService } from '../api/token/jwt.service';

export const SharedModuleProviders = [
  TokenService,
  {
    provide: APP_INTERCEPTOR,
    useClass: AuthInterceptor,
  },
];
