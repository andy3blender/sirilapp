import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AlertModule } from '@full-fledged/alerts';

//ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//modulos
import { LoginModule } from './views/login/login.module';
import { appReducers, metaReducers } from './store/app.reducer';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from './store/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top'}),
    LoginModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot( appReducers, { metaReducers } ),
    EffectsModule.forRoot( EffectsArray ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    ReactiveFormsModule,    
    MatSnackBarModule,    
    
  ],
  providers: [
],
  bootstrap: [AppComponent]
})
export class AppModule { }
