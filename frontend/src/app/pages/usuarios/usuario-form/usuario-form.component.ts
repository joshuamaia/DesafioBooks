import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';
import { Validators } from '@angular/forms';
import { UsuarioDto } from '../shared/usuariodto.model';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { Role } from '../shared/role.model';
import { AuthService } from 'src/app/layout/login/auth.service';

import swal from 'sweetalert2';
import { CpfCnpjPipe } from 'src/app/cpf-cnpj.pipe';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  providers: [CpfCnpjPipe],
})
export class UsuarioFormComponent extends BaseResourceFormComponent<Usuario> {
  private usuarioDto: UsuarioDto;
  roles?: Role[] = [];
  rolesTarget?: Role[] = [];

  constructor(
    protected usuarioService: UsuarioService,
    public authService: AuthService,
    protected injector: Injector,
    protected cpfCnpjPipe: CpfCnpjPipe
  ) {
    super(injector, new Usuario(), usuarioService, Usuario.fromJson);
  }

  protected async beforeCreate() {}

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      cpfCnpj: [null, [Validators.required]],
      login: [null, [Validators.required]],
      receberEmail: [null],
      enabled: [true],
      senha: [null],
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

  loadResource() {
    if (this.currentAction == 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) => this.resourceService.getById(+params.get('id')))
        )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.resourceForm.patchValue(resource);

            this.rolesTarget = this.resource.roles ? this.resource.roles : [];

            this.usuarioService
              .getRolesNotUserRegistered(this.resource.id)
              .subscribe((response) => {
                this.roles = response;
              });

            // binds loaded resource data to resourceForm
          },
          (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    } else {
      this.usuarioService.getRolesNotUserRegistered(0).subscribe((response) => {
        this.roles = response;
      });
    }
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

  createResource() {
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

    resource.roles = this.rolesTarget;

    this.usuarioDto = new UsuarioDto();
    this.usuarioDto.usuario = resource;
    this.usuarioDto.senha = resource.senha;

    this.enviando = true;
    this.usuarioService.createDto(this.usuarioDto).subscribe(
      (resource) => {
        this.enviando = false;
        this.actionsForSuccess(resource);
      },
      (error) => {
        this.enviando = false;
        this.actionsForError(error);
      }
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
        `O CPF ou CNPJ deve conter apenas números. CPF 11 digitos, CNPJ 14 digitos`,
        'error'
      );
      return;
    }

    resource.roles = this.rolesTarget;

    this.usuarioDto = new UsuarioDto();
    this.usuarioDto.usuario = resource;

    this.usuarioDto.senha = resource.senha === undefined ? '' : resource.senha;

    this.enviando = true;
    this.usuarioService.updateDto(this.usuarioDto).subscribe(
      (resource) => {
        if (this.authService.usuario.id === this.usuarioDto.usuario.id) {
          this.authService.atualizaUsuario(
            this.usuarioDto.usuario.nome,
            this.usuarioDto.usuario.roles
          );
        }
        this.enviando = false;
        this.actionsForSuccess(resource);
      },
      (error) => {
        this.enviando = false;
        this.actionsForError(error);
      }
    );
  }
}
