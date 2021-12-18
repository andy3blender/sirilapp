import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { personaUsuario } from '../models/personaUsuario';
import * as globals from '../globals';
import { of, Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { catchError, exhaustMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private url = `${globals.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
    };
  }

  getUsuarios() {
    return this.http.get<Usuario[]>(this.url).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getUsuario(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  addUsuario(usuario: Usuario): Observable<any> {
    return this.usuarioExist(usuario).pipe(
      exhaustMap((exist) => {
      if (exist){
        return throwError('Este usuario ya existe');
      }
      else {
        return this.http.post<Usuario>(this.url, usuario).pipe(
          catchError(err => {
            console.log(err);
            return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
          })
        );
      }
      })
    );
  }

  usuarioExist(usuario: Usuario): Observable<boolean> {
    return this.http.get<Usuario[]>(this.url).pipe(
      map((usuarios) => {
        if (usuarios.find(x => x.login === usuario.login) === undefined)
        {
          return false;
        }
        else
        {
          return true;
        }
      })
    );
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.url}/${usuario.usuarioId}`, usuario).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  deleteUsuario(id: number) {
    return this.http.delete<Usuario>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getPersonaUsuario() {
    return this.http.get<personaUsuario[]>(`${this.url}/GetPersonaUsuario`);
  }

  updatePassword(usuarioId: number, nuevoPass: string ) {
    return this.http.patch(`${this.url}/ActualizarPassword/${usuarioId}/${nuevoPass}`, nuevoPass).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  updateFoto(personaId: string, foto: FormData ): Observable<any> {
    console.log(foto.has('miFile'));
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
      //headers: new HttpHeaders({'Content-Type': 'application/json', , httpOptions}) ; boundary=MINE_BOUNDARY , httpOptions
    }
    return this.http.patch(`${this.url}/ActualizarFoto/${personaId}`, foto).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  // updateFoto(personaId: string, foto: ArrayBuffer ): Observable<any> {
  //   console.log(foto);
  //   const httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'})
  //   }
  //   return this.http.patch(`${this.url}/ActualizarFoto/${personaId}`, foto).pipe(
  //     catchError(err => {
  //       console.log(err);
  //       return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
  //     })
  //   );
  // }

}