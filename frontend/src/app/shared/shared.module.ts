import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { FieldsetModule } from 'primeng/fieldset';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CpfCnpjPipe } from '../cpf-cnpj.pipe';
import { RatingModule } from 'primeng/rating';

registerLocaleData(localePt, 'pt');

const modules = [MatFormFieldModule, MatInputModule];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PaginatorModule,
    PickListModule,
    NgSelectModule,
    FormsModule,
    CalendarModule,
    FieldsetModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CurrencyMaskModule,
    RatingModule,
    ...modules,
  ],
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    CpfCnpjPipe,
  ],
  exports: [
    // shared modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PaginatorModule,
    PickListModule,
    NgSelectModule,
    FormsModule,
    CalendarModule,
    FieldsetModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CurrencyMaskModule,
    RatingModule,
    ...modules,
    // shared components
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    CpfCnpjPipe,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
})
export class SharedModule {}
