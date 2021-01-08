import { BaseResourceModel } from "../models/base-resource.model";

import { Injector, Injectable, Inject, Optional } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AuthService } from "src/app/layout/login/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;
  protected router: Router;
  protected headers: HttpHeaders;

  constructor(
    @Inject('API_HOST') protected apiPath: string,
    protected injector: Injector,
    @Inject("RESOURCE") protected jsonDataToResourceFn: (jsonData: any) => T,
    protected authService: AuthService
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    this.carregaHeaders();
    return this.http
      .get(`${this.apiPath}/listar`, { headers: this.headers })
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<T> {
    this.carregaHeaders();
    const url = `${this.apiPath}/${id}`;

    return this.http
      .get(url, { headers: this.headers })
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  create(resource: T): Observable<T> {
    this.carregaHeaders();
    return this.http
      .post(`${this.apiPath}/criar`, resource, { headers: this.headers })
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  update(resource: T): Observable<T> {
    this.carregaHeaders();
    const url = `${this.apiPath}/atualizar`;

    return this.http.put(url, resource, { headers: this.headers }).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    this.carregaHeaders();
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url, { headers: this.headers }).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  // PROTECTED METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element =>
      resources.push(this.jsonDataToResourceFn(element))
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }

  protected carregaHeaders() {
    let token = this.authService.token;

    if (this.authService.isAuthenticated && token != null) {
      this.headers = new HttpHeaders();
      this.headers = this.headers.append("Authorization", "Bearer " + token);
    }
  }
}
