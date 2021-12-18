import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as personaActions from '../actions/persona.actions';
import { of } from 'rxjs';
import { PersonaService } from "src/app/services/persona.service";

@Injectable()
export class PersonaEffects {
    constructor(
        private actions$: Actions,
        private personaService: PersonaService,        
    ) {}

    getPersonas$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.getPersonas ),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                () => this.personaService.getPersonas().pipe(
                    //tap( data => console.log('data user services',data)),
                    map( personas => personaActions.getPersonasSuccess ({ personas: personas })),
                    catchError( error => of(personaActions.getPersonasError({ payload: error })))
                    )
                )
            )
    );

    addPersona$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.addPersona ),
            concatMap( 
                ({ persona }) => 
                    this.personaService.addPersona(persona).pipe(
                    map( () => personaActions.addPersonaSuccess ()),
                    catchError( error => of(personaActions.addPersonaError({ payload: error })))
                    )
                )
            )
    );

    editPersona$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.editPersona ),
            concatMap( 
                ({persona}) => this.personaService.updatePersona(persona).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( persona => personaActions.editPersonaSuccess ({ persona: persona })),
                    catchError( error => of(personaActions.editPersonaError({ payload: error })))
                    )
                )
            )
    );

    deletePersona$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.deletePersona ),
            concatMap( 
                ({personaId}) => this.personaService.deletePersona(personaId).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( () => personaActions.deletePersonaSuccess ()),
                    catchError( error => of(personaActions.deletePersonaError({ payload: error })))
                    )
                )
            )
    );
}