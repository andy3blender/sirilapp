import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from '@full-fledged/alerts';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule,
    ReactiveFormsModule,
    AlertModule
  ]
})
export class LoginModule { }
