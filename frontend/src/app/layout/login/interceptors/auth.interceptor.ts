import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { AuthService } from "../auth.service";
import swal from "sweetalert2";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(["/login"]);
        }

        if (e.status == 403) {
          swal.fire(
            "Acceso negado",
            `Olá ${this.authService.usuario.nome} não tens acesso a esta tela!`,
            "warning"
          );
          this.router.navigate(["/alterarsenha"]);
        }
        return throwError(e);
      })
    );
  }
}
