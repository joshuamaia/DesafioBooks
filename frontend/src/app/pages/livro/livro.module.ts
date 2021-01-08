import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivroRoutingModule } from './livro-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LivroFormComponent } from './livro-form/livro-form.component';
import { LivroListComponent } from './livro-list/livro-list.component';

@NgModule({
  declarations: [LivroFormComponent, LivroListComponent],
  imports: [CommonModule, LivroRoutingModule, SharedModule],
})
export class LivroModule {}
