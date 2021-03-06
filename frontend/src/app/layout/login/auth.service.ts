import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/pages/usuarios/shared/usuario.model';
import { Role } from 'src/app/pages/usuarios/shared/role.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) {}

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      sessionStorage.getItem('usuario') != null
    ) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public atualizaUsuario(nome: string, roles: Role[]) {
    this._usuario = this.usuario;

    if (nome) {
      this._usuario.nome = nome;
    }

    if (roles) {
      this._usuario.roles = roles;
    }
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = `${environment.serverUrl}/oauth/token`;

    const credenciales = btoa('desafio' + ':' + '999888');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.login);
    params.set('password', usuario.senha);
    return this.http.post<any>(urlEndpoint, params.toString(), {
      headers: httpHeaders,
    });
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.id = payload.id;
    this._usuario.nome = payload.nome;
    this._usuario.email = payload.email;
    this._usuario.login = payload.login;
    this._usuario.roles = [];
    if (payload.authorities) {
      for (var i = 0; i < payload.authorities.length; i++) {
        var role: Role = new Role();
        role.nome = payload.authorities[i];
        this._usuario.roles.push(role);
      }
    }

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(
        decodeURIComponent(escape(atob(accessToken.split('.')[1])))
      );
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    const roles = role.split(',');
    if (this.usuario.roles) {
      for (var i = 0; i < this.usuario.roles.length; i++) {
        for (var j = 0; j < roles.length; j++) {
          if (this.usuario.roles[i].nome === roles[j].trim()) {
            return true;
          }
        }
      }
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
