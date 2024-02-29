import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Injectable()
export class authInterceptor implements HttpInterceptor{
  constructor(private _authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authToken = localStorage.getItem('token');

    if (authToken) {
      const authequest = req.clone({
        headers:req.headers.set("Authorization",authToken!)
      })

      return next.handle(authequest);
    }

    return next.handle(req);
  }

}
