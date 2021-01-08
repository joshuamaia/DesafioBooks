import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';
import { Page } from 'src/app/shared/models/page.model';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/layout/login/auth.service';
import { Role } from '../shared/role.model';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent
  extends BaseResourceListComponent<Usuario>
  implements OnInit {
  public usuarios: Usuario[] = [];
  public page: Page;
  public pagina = 0;
  public totalElementos = 0;
  public size = this.TAMANHO_LISTA;
  public palavra: string = '';
  public usuarioSelecionado: Usuario = new Usuario();

  public usuarioSelecionadoRoles: Role[] = [];

  constructor(
    private usuarioService: UsuarioService,
    public authService: AuthService
  ) {
    super(usuarioService);
  }

  paginate(event) {
    //console.log(event);
    this.usuarioService
      .getAllPage(event.page, event.rows, this.palavra)
      .subscribe((response) => {
        this.page = response;
        this.usuarios = this.page.content;
        this.totalElementos = this.page.totalElements;
      });
  }

  carregaUsuario(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
    this.usuarioSelecionadoRoles = this.usuarioSelecionado.roles;
  }

  search() {
    this.usuarioService
      .getAllPage(this.pagina, this.size, this.palavra)
      .subscribe((response) => {
        this.page = response;
        this.usuarios = this.page.content;
        this.totalElementos = this.page.totalElements;
      });
  }

  ngOnInit() {
    this.usuarioService
      .getAllPage(this.pagina, this.size, this.palavra)
      .subscribe((response) => {
        this.page = response;
        this.usuarios = this.page.content;
        this.totalElementos = this.page.totalElements;
      });
  }

  async deleteResource(resource: Usuario) {
    const confirmacao = await swal.fire({
      title: 'Excluir',
      text: 'Deseja realmente excluir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    });

    // console.log(confirmacao);

    if (confirmacao.value) {
      this.usuarioService.delete(resource.id).subscribe(
        () =>
          (this.usuarios = this.usuarios.filter(
            (element) => element != resource
          )),
        () => alert('Erro ao tentar excluir!')
      );
    }
  }
}
