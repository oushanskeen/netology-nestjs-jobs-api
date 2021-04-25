import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request } from 'express-serve-static-core';
import { Response } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    //Function is () => void
    console.log('Logging DELETE request IP ', req.ip);
    console.log('Logging DELETE request Path ', req.path);
    console.log('Logging DELETE request Headers ', req.headers);
    next();
  }
}
