import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class BenchmarkInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    console.log('Endppoint: ', request.url);
    console.log('Methos: ', request.method);
    const now = Date.now();
    return next.handle().pipe(
      //tap(() => console.log(`Execution time: ${Date.now() - now}ms`)),
      tap((result) => {
        if (result) {
          //return result;
          return {
            status: 'success',
            data: result,
          };
        } else {
          //throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
          return {
            status: 'fail',
            data: {
              msg: 'Something goes wrong',
              errorCode: HttpStatus.NOT_FOUND,
            },
          };
        }
      }),
    );
  }
}
