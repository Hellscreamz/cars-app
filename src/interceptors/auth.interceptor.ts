import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { TokenService } from '../api/token/jwt.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  private token: string;

  constructor(private readonly tokenService: TokenService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();

    if (!this.token) {
      this.token = await this.tokenService.fetchJwtToken();
    }

    if (info.fieldName === 'getToken') {
      return next.handle();
    }

    const request = gqlContext.getContext().req;

    if (request && !request.headers['Authorization']) {
      request.headers['Authorization'] = `Bearer ${this.token}`;
    }
    console.log(request.headers);
    return next.handle();
  }
}
