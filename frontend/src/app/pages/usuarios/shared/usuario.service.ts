import { Injectable, Injector } from "@angular/core";
import { Usuario } from "./usuario.model";

import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { UsuarioDto } from "./usuariodto.model";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Role } from "./role.model";
import { AuthService } from "src/app/layout/login/auth.service";
import { UtilService } from "src/app/shared/services/util.service";

@Injectable({
  providedIn: "root"
})
export class UsuarioService extends BaseResourceService<Usuario> {
  constructor(
    protected injector: Injector,
    protected authService: AuthService
  ) {
    super(
      `${UtilService.BASE_URL}/usuario`,
      injector,
      Usuario.fromJson,
      authService
    );
  }

  getAllPage(page: number, size: number, palavra: string): Observable<any> {
    this.carregaHeaders();
    return this.http
      .get(`${this.apiPath}/listar/page/${page}/${size}/${palavra}`, {
        headers: this.headers
      })
      .pipe(catchError(this.handleError));
  }

  getRoles(): Observable<Role[]> {
    this.carregaHeaders();
    return this.http
      .get(`${this.apiPath}/roles`, {
        headers: this.headers
      })
      .pipe(catchError(this.handleError));
  }

  getRolesNotUserRegistered(id: number): Observable<Role[]> {
    this.carregaHeaders();
    return this.http
      .get(`${this.apiPath}/rolesnaoregistrado/${id}`, {
        headers: this.headers
      })
      .pipe(catchError(this.handleError));
  }

  getUsuarioLogado(): Observable<Usuario> {
    this.carregaHeaders();
    return this.http
      .get(`${this.apiPath}/usuariologado`, {
        headers: this.headers
      })
      .pipe(catchError(this.handleError));
  }

  createDto(resource: UsuarioDto): Observable<Usuario> {
    this.carregaHeaders();
    return this.http
      .post(`${this.apiPath}/criar`, resource, {
        headers: this.headers
      })
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  updateDtoLogado(resource: UsuarioDto): Observable<Usuario> {
    this.carregaHeaders();
    const url = `${this.apiPath}/atualizarusuariologado`;

    return this.http
      .put(url, resource, {
        headers: this.headers
      })
      .pipe(
        map(() => resource),
        catchError(this.handleError)
      );
  }

  updateDto(resource: UsuarioDto): Observable<Usuario> {
    this.carregaHeaders();
    const url = `${this.apiPath}/atualizar`;

    return this.http
      .put(url, resource, {
        headers: this.headers
      })
      .pipe(
        map(() => resource),
        catchError(this.handleError)
      );
  }
}
