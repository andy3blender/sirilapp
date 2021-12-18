import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../globals';
import { of, Observable, throwError } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CatalogoGrupo } from '../models/catalogoGrupo';
import { CatalogoGeneral } from '../models/catalogoGeneral';

@Injectable({
  providedIn: 'root'
})

export class CatalogoService {

  private urlGrupo = `${globals.apiUrl}/CatalogoGrupos`;
  private url = `${globals.apiUrl}/catalogoGenerales`;

  constructor(private http: HttpClient) { }

  getCatalogoGrupos() {
    return this.http.get<CatalogoGrupo[]>(this.urlGrupo).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getCatalogoGrupoSegmento(segmento: string) {
    return this.http.get<CatalogoGrupo[]>(`${this.urlGrupo}/GetGrupoSegmento/${segmento}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  updateCatalogoGrupo(item: CatalogoGrupo): Observable<any> {
    console.log(item);
    return this.http.put(`${this.urlGrupo}/${item.grupoId}`, item).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getCatalogoItems(grupoId: number) {
    return this.http.get<CatalogoGeneral[]>(`${this.url}/GetGrupo/${grupoId}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getCatalogoItemsHijos(grupoId: number,padreId: number) {
    return this.http.get<CatalogoGeneral[]>(`${this.url}/GetGrupoHijos/${grupoId}/${padreId}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  addCatalogoItem(item: CatalogoGeneral): Observable<any> {
    return this.http.post<CatalogoGeneral>(this.url, item).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    ); 
  }

  updateCatalogoItem(item: CatalogoGeneral): Observable<any> {
    return this.http.put(`${this.url}/${item.catalogoId}`, item).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  deleteCatalogoItem(id: number): Observable<any> {
    return this.http.delete<CatalogoGeneral>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

}