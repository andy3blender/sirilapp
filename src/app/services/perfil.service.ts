import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from '../models/perfil';
import { permisoPerfil } from '../models/permisoPerfil';
import * as globals from '../globals';
import { Observable, throwError, of } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Permiso } from '../models/permiso';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class PerfilService {

  private url = `${globals.apiUrl}/perfiles`;
  private urlPermisos = `${globals.apiUrl}/permisoperfiles`;
  private urlPermiso = `${globals.apiUrl}/permisos`;
  private urlUsuarios = `${globals.apiUrl}/usuarios`;
  permiso: Permiso;
  permisoArray: Permiso[]=[];
  //permisoCreado: Permiso;

  constructor(private http: HttpClient) { }

  getPerfiles() {
    return this.http.get<Perfil[]>(this.url).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getPerfil(id: number) {
    return this.http.get<Perfil>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  addPerfil(perfil: Perfil): Observable<any> {
        return this.http.post<Perfil>(this.url, perfil).pipe(
          catchError(err => {
            console.log(err);
            return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
          })
        );
  }

  updatePerfil(perfil: Perfil): Observable<any> {
    //console.log(`UpdatePerfil en perfil.service, perfilId:${perfil.perfilId}`);
    return this.http.put(`${this.url}/${perfil.perfilId}`, perfil).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  deletePerfil(id: number): Observable<any> {
    return this.checkUsuarioPerfil(id).pipe(
      exhaustMap((exist) => {
        if(exist) {
          return throwError('Hay usuarios asignados a este perfil.');
        }
        else {
          return this.http.delete<Perfil>(`${this.url}/${id}`).pipe(
            catchError(err => {
              console.log(err);
              return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
            })
          );
        }
      })
    );
  }

  checkUsuarioPerfil(perfilId: number): Observable<boolean> {
    return this.http.get<Usuario[]>(this.urlUsuarios).pipe(
      map((usuarios) => {
        if (usuarios.find(x => x.perfilId === perfilId) === undefined)
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

  //PERMISO PERFILES
  getPermisoPerfiles(perfilId: number) {
    //console.log(`Id en servicio:${perfilId}`);
    return this.http.get<permisoPerfil[]>(`${this.urlPermisos}/${perfilId}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  addPermisos(perfilId: number, permiso: string[]): Observable<any> {
      for(let i=0; i < permiso.length; i++) {
        // console.log(`Valor ${i}: ${permiso[i]}`);
        this.permiso = {
            perfilId: perfilId,
            menuId: parseInt(permiso[i])
        }
        this.permisoArray.push(this.permiso);
      }

      return this.http.post<Permiso>(this.urlPermiso, this.permisoArray).pipe(
            catchError(err => {
              console.log(err);
              return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
            })
          );
  }

  updatePermisos(perfilId: number, permisoArrStr: string[]): Observable<any> {
    this.permisoArray = [];
    
    for(let i=0; i < permisoArrStr.length; i++) {
      this.permiso = {
          perfilId: perfilId,
          menuId: parseInt(permisoArrStr[i])
      }
      this.permisoArray.push(this.permiso);
    }

    return this.http.put<Permiso>(`${this.urlPermiso}/${perfilId}`, this.permisoArray).pipe(
          catchError(err => {
            console.log(err);
            return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
          })
        );
  }

  deletePermisos(perfilId: number) {
    return this.http.delete<Permiso>(`${this.urlPermiso}/${perfilId}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

}