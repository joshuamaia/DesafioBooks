import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/layout/login/auth.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Usuario } from '../../usuarios/shared/usuario.model';
import { UsuarioService } from '../../usuarios/shared/usuario.service';
import { Livro } from '../shared/livro.model';
import { LivroService } from '../shared/livro.service';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css'],
})
export class LivroFormComponent extends BaseResourceFormComponent<Livro> {
  public usuario: Usuario;
  constructor(
    protected livroService: LivroService,
    private usuarioService: UsuarioService,
    public authService: AuthService,
    protected injector: Injector
  ) {
    super(injector, new Livro(), livroService, Livro.fromJson);
  }

  protected async beforeCreate() {
    this.usuario = await this.usuarioService.getUsuarioLogado().toPromise();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      autor: [null],
      ano: [null],
      usuario: [this.usuario],
      nota: [null],
      paginaAtual: [null],
      dataInicio: [null],
      dataFim: [null],
      observacao: [null],
    });
  }

  createResource() {
    const resource: Livro = this.jsonDataToResourceFn(this.resourceForm.value);
    resource.usuario = this.usuario;
    this.enviando = true;
    this.resourceService.create(resource).subscribe(
      (resource) => {
        this.enviando = false;
        this.actionsForSuccess(resource);
      },
      (error) => {
        this.enviando = false;
        this.actionsForErrorMensage(error, error.error.message);
      }
    );
  }

  updateResource() {
    const resource: Livro = this.jsonDataToResourceFn(this.resourceForm.value);
    resource.usuario = this.usuario;
    this.enviando = true;
    this.resourceService.update(resource).subscribe(
      (resource) => {
        this.enviando = false;
        this.actionsForSuccess(resource);
      },
      (error) => {
        this.enviando = false;
        this.actionsForErrorMensage(error, error.error.message);
      }
    );
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Novo Livro';
  }

  protected editionPageTitle(): string {
    const nome = this.resource.nome;
    return 'Editando Livro: ' + nome;
  }
}
