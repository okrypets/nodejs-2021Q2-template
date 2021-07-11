import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { validationMiddleware } from "../middleware/validationMiddleware";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
      ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    try {
      return validationMiddleware(req, res);
    } catch (error) {
      return false
    } 
  }
}
