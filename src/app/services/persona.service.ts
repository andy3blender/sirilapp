import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import * as globals from '../globals';
import { of, Observable, throwError } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {

  private url = `${globals.apiUrl}/personas`;

  constructor(private http: HttpClient) { }

  getPersonas() {
    return this.http.get<Persona[]>(this.url).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getPersona(id: string) {
    return this.http.get<Persona>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  updatePersona(persona: Persona): Observable<any> {
    return this.http.put(`${this.url}/${persona.identificacion}`, persona).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  deletePersona(id: string) {
    return this.http.delete<Persona>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  personExist(personaId: string): Observable<boolean> {
    return this.http.get<Persona[]>(this.url).pipe(
      map((personas) => {
        if (personas.find(x => x.identificacion === personaId) === undefined)
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

  addPersona(persona: Persona): Observable<any> {
    return this.personExist(persona.identificacion).pipe(
      exhaustMap((exist) => {
      if (exist){
        return throwError('Esta identificación ya existe');
      }
      else {
        return this.http.post<Persona>(this.url, persona).pipe(
          //catchError(this.handleError<Persona>('addPerson'))
          catchError(err => {
            //console.log(err);
            return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
          })
        );
      }
      })
    );
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //       console.error(error); // log to console instead
  //       return of(result as T);
  //   };
  // }

}