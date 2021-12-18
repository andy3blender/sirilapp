import { Injectable } from '@angular/core';
import * as globals from '../globals';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { switchMap } from 'rxjs/operators';
import { throwError, Observable, of, Subscription } from 'rxjs';
import { AppSate } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { getMenuByUser } from '../store/actions/menu.actions';
import { personaUsuario } from '../models/personaUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = globals.apiUrl;
  private _usuarioActual: personaUsuario;
  //userSubscription: Subscription;

  get usuarioActual() {
    return this._usuarioActual;
  }

  constructor(private http: HttpClient, 
              private store: Store<AppSate>) { }

  getUsuarios() {
    return this.http.get<Usuario[]>(`${this.url}/usuarios`);
  }

  login( login: string, password: string): Observable<Usuario> {
    return this.http.get<Usuario[]>(`${this.url}/usuarios`).pipe(
      switchMap(users => {
        const user = users.find( u => u.login == login && u.clave == password );
        if( user !== undefined){
          if(user.activo)
            return of(user);
          else
            return throwError('Usuario inactivo');
        }
        else 
          return throwError('Usuario o password inválidos');
      })
    )
  }

  login2( login: string, password: string): Observable<personaUsuario> {
    return this.http.get<personaUsuario[]>(`${this.url}/usuarios/GetPersonaUsuario`).pipe(
      switchMap(users => {
        const user = users.find( u => u.login == login && u.clave == password );
        if( user !== undefined){
          if(user.activo)
            return of(user);
          else
            return throwError('Usuario inactivo');
        }
        else 
          return throwError('Usuario o password inválidos');
      })
    )
  }

  getUserData( login: string): Observable<personaUsuario> {
    return this.http.get<personaUsuario[]>(`${this.url}/usuarios/GetPersonaUsuario`).pipe(
      switchMap(users => {
        const user = users.find( u => u.login == login );
        if( user !== undefined){
            return of(user);
        }
        else 
          return throwError('Usuario no encontrado');
      })
    )
  }

  initUserListener() {

    this.store.select('login').subscribe( 
      user => {
        if(user) {
          this._usuarioActual = user.user;
          //this.store.dispatch( getMenuByUser({ login: this.usuarioActual.login }));
        }                             
      })
  }



}
