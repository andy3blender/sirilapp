import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as perfilActions from '../actions/perfil.actions';
import { of } from 'rxjs';
import { PerfilService } from "src/app/services/perfil.service";
import { Store } from '@ngrx/store';
import { AppStateWithPerfil } from '../reducers/perfil.reducers';
import { addPermisos, editPermisos } from '../actions/permiso.actions';

@Injectable()
export class PerfilEffects {
    constructor(
        private actions$: Actions,
        private perfilService: PerfilService,  
        private store: Store<AppStateWithPerfil>      
    ) {}

    getPerfiles$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.getPerfiles ),
            // tap( data => console.log('effect tap',data)),
            concatMap( 
                () => this.perfilService.getPerfiles().pipe(
                    // tap( data => console.log('data user services',data)),
                    map( perfiles => perfilActions.getPerfilesSuccess ({ perfiles: perfiles })),
                    catchError( error => of(perfilActions.getPerfilesError({ payload: error })))
                    )
                )
            )
    );

    addPerfil$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.addPerfil ),
            concatMap( 
                ({ perfil, permiso }) => this.perfilService.addPerfil(perfil).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( (perfilIns) => perfilActions.addPerfilSuccess( { perfilId: perfilIns.perfilId, permiso: permiso })),
                    catchError( error => of(perfilActions.addPerfilError({ payload: error })))
                    )
                )
            )  
    );

    addPerfilSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.addPerfilSuccess ),
            tap( ({ perfilId, permiso }) => {
                this.store.dispatch( addPermisos( { perfilId: perfilId, permiso: permiso }) )
            })            
        ),
        {
            dispatch: false
        }
    );

    //crear addPerfilSucces para que llame al store de permiso y se lo crea!!

    editPerfil$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.editPerfil ),
            concatMap( 
                ({ perfil, permiso }) => this.perfilService.updatePerfil(perfil).pipe(
                    //tap( () => console.log(`Effecto editPerfil, permiso:${permiso}`)),
                    map( () => perfilActions.editPerfilSuccess ({ perfilId: perfil.perfilId, permiso: permiso })),
                    catchError( error => of(perfilActions.editPerfilError({ payload: error })))
                    )
                )
            )
    );

    editPerfilSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.editPerfilSuccess ),
            tap( ({ perfilId, permiso }) => {
                //console.log(`Perfil id en editPerfilSuccess: ${perfilId}`);
                this.store.dispatch( editPermisos( { perfilId: perfilId, permiso: permiso }) )
            })            
        ),
        {
            dispatch: false
        }
    );

    deletePerfil$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.deletePerfil ),
            concatMap( 
                ({perfilId}) => this.perfilService.deletePerfil(perfilId).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( () => perfilActions.deletePerfilSuccess ()),
                    catchError( error => of(perfilActions.deletePerfilError({ payload: error })))
                    )
                )
            )
    );
}