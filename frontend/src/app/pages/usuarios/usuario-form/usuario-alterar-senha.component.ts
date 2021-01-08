import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';
import { Validators } from '@angular/forms';
import { UsuarioDto } from '../shared/usuariodto.model';

import toastr from 'toastr';

import { AuthService } from 'src/app/layout/login/auth.service';
import swal from 'sweetalert2';
import { CpfCnpjPipe } from 'src/app/cpf-cnpj.pipe';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-alterar-senha-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  providers: [CpfCnpjPipe],
})
export class UsuarioAlterarSenhaFormComponent extends BaseResourceFormComponent<Usuario> {
  private usuarioDto: UsuarioDto;
  constructor(
    protected usuarioService: UsuarioService,
    private authService: AuthService,
    protected injector: Injector,
    protected cpfCnpjPipe: CpfCnpjPipe
  ) {
    super(injector, new Usuario(), usuarioService, Usuario.fromJson);
  }

  protected async beforeCreate() {}

  loadResource() {
    this.usuarioService.getUsuarioLogado().subscribe(
      (resource) => {
        this.resource = resource;
        this.resourceForm.patchValue(resource);

        // binds loaded resource data to resourceForm
      },
      (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
    );
  }

  carregaUsuario() {
    this.usuarioService
      .getUsuarioLogado()
      .subscribe((resposta) => (this.resource = resposta));
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      cpfCnpj: [null, [Validators.required]],
      login: [null, [Validators.required]],
      receberEmail: [true],
      enabled: [true],
      senha: [null],
      entidadesEsportivas: [null],
      roles: [null],
    });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Novo Usuário';
  }

  protected editionPageTitle(): string {
    const usuarioName =
      this.resource?.nome +
      ' - CPF/CNPJ: ' +
      this.cpfCnpjPipe.transform(this.resource?.cpfCnpj);
    return 'Editando Usuário: ' + usuarioName;
  }

  editando(): boolean {
    if (this.resource.id) {
      return true;
    }
    return false;
  }

  actionsForSuccess(resource: UsuarioDto) {
    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    // redirect/reload component page
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([baseComponentPath, resource.usuario.id, 'edit'])
      );
  }

  updateResource() {
    const resource: Usuario = this.jsonDataToResourceFn(
      this.resourceForm.value
    );

    const regex = /^[0-9]+$/;

    if (!regex.test(resource.cpfCnpj)) {
      swal.fire('CPF Inválido', `O CPF só pode conter números`, 'error');
      return;
    }

    if (resource.cpfCnpj.length != 11 && resource.cpfCnpj.length != 14) {
      swal.fire(
        'CPF Inválido',
        `CPF deve conter 11 digitos e CNPJ deve conter 14 digitos`,
        'error'
      );
      return;
    }

    this.usuarioDto = new UsuarioDto();
    this.usuarioDto.usuario = resource;

    this.usuarioDto.senha = resource.senha === undefined ? '' : resource.senha;

    this.usuarioService.updateDtoLogado(this.usuarioDto).subscribe(
      (resource) => {
        if (this.authService.usuario.id === this.usuarioDto.usuario.id) {
          this.authService.atualizaUsuario(this.usuarioDto.usuario.nome, null);
        }
        swal.fire(
          'Usuário Atualizado',
          `Usuário ${this.usuarioDto.usuario.nome} atualizado com sucesso!`,
          'info'
        );
      },
      (error) => this.actionsForError(error)
    );
  }
}
