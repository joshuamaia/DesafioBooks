import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/layout/login/auth.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Page } from 'src/app/shared/models/page.model';
import { Livro } from '../shared/livro.model';
import { LivroService } from '../shared/livro.service';
import swal from 'sweetalert2';
import { UsuarioService } from '../../usuarios/shared/usuario.service';
import { Usuario } from '../../usuarios/shared/usuario.model';

@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.css'],
})
export class LivroListComponent
  extends BaseResourceListComponent<Livro>
  implements OnInit {
  public usuario: Usuario;
  public livros: Livro[] = [];
  public page: Page;
  public pagina = 0;
  public totalElementos = 0;
  public size = this.TAMANHO_LISTA;
  public palavra: string = '';
  public livroSelecionado: Livro = new Livro();
  public somaValorFixadoExercicioCategoria: number = 0;
  public campeonatoParaibano: boolean = false;

  constructor(
    private livroService: LivroService,
    private usuarioService: UsuarioService,
    public authService: AuthService
  ) {
    super(livroService);
  }

  async carregaLivro(evento: Livro) {
    this.livroSelecionado = evento;
  }

  paginate(event) {
    this.livroService
      .getAllPage(event.page, event.rows, this.palavra)
      .subscribe((response) => {
        this.page = response;
        this.livros = this.page.content;
        this.totalElementos = this.page.totalElements;
      });
  }

  search() {
    this.livroService
      .getAllPage(this.pagina, this.size, this.palavra)
      .subscribe((response) => {
        this.page = response;
        this.livros = this.page.content;
        this.totalElementos = this.page.totalElements;
      });
  }

  habilitaEdicao(usuario: Usuario) {
    return usuario.id === this.usuario.id;
  }

  async ngOnInit() {
    this.usuario = await this.usuarioService.getUsuarioLogado().toPromise();
    this.livroService
      .getAllPage(this.pagina, this.size, this.palavra)
      .subscribe((response) => {
        this.page = response;
        this.livros = this.page.content;
        this.totalElementos = this.page.totalElements;
      });
  }

  async deleteResource(resource: Livro) {
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

    if (confirmacao.value) {
      this.livroService.delete(resource.id).subscribe(
        () =>
          (this.livros = this.livros.filter((element) => element != resource)),
        () => alert('Erro ao tentar excluir!')
      );
    }
  }
}
