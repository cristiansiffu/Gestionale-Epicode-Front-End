import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user) => {
        const newReq = request.clone({
          headers: request.headers
            .set('Authorization', `Bearer ${environment.adminToken}`)
            .set('X-TENANT-ID', environment.adminTenant),
        });

        return next.handle(newReq);
      })
    );
  }
}
