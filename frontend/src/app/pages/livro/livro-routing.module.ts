import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivroFormComponent } from './livro-form/livro-form.component';
import { LivroListComponent } from './livro-list/livro-list.component';

const routes: Routes = [
  { path: '', component: LivroListComponent },
  { path: 'new', component: LivroFormComponent },
  { path: ':id/edit', component: LivroFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivroRoutingModule {}
