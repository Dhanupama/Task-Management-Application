import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.services';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  console.log('JWT Interceptor - Token:', token); // Debug log

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('JWT Interceptor - Request with Authorization:', cloned.headers.get('Authorization')); // Debug log
    return next(cloned);
  }

  console.log('JWT Interceptor - No token, passing request as-is'); // Debug log
  return next(req);
};