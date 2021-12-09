import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig : any = {
        "Content-Type": "application/json; charset=utf-8",
    };

    const token = localStorage.getItem('CURRENT_USER') 
      ? JSON.parse(localStorage.getItem('CURRENT_USER')!).user.token
      : null
    
    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}