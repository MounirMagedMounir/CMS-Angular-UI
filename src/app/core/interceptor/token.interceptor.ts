import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
const token = localStorage.getItem('token')??"";
req = req.clone({
    setHeaders: {
      Authorization:token? `Bearer ${token}`: ''
    }
    });

  return next(req);
};
