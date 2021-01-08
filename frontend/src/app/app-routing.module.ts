import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { UsuarioAlterarSenhaFormComponent } from './pages/usuarios/usuario-form/usuario-alterar-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  {
    path: 'livro',
    loadChildren: () =>
      import('./pages/livro/livro.module').then((m) => m.LivroModule),
  },

  { path: 'alterarsenha', component: UsuarioAlterarSenhaFormComponent },
  { path: '**', redirectTo: 'alterarsenha' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
