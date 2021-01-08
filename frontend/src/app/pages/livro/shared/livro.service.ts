import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Livro } from './livro.model';
import { AuthService } from 'src/app/layout/login/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Injectable({
  providedIn: 'root',
})
export class LivroService extends BaseResourceService<Livro> {
  constructor(
    protected injector: Injector,
    protected authService: AuthService
  ) {
    super(
      `${UtilService.BASE_URL}/livro`,
      injector,
      Livro.fromJson,
      authService
    );
  }

  getAllPage(page: number, size: number, palavra: string): Observable<any> {
    this.carregaHeaders();
    return this.http
      .get(`${this.apiPath}/listar/page/${page}/${size}/${palavra}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }
}
