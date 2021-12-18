import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as permisoActions from '../actions/permisoPerfil.actions';
import { of } from 'rxjs';
import { PerfilService } from "src/app/services/perfil.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';

@Injectable()
export class PermisoPerfilEffects {
    constructor(
        private actions$: Actions,
        private _snackBar: MatSnackBar,
        private permisoPerfilService: PerfilService,        
    ) {}

    getPermisoPerfiles$ = createEffect(
        () => this.actions$.pipe(
            ofType( permisoActions.getPermisoPerfil ),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                ({perfilId}) => this.permisoPerfilService.getPermisoPerfiles(perfilId).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( permisos => permisoActions.getPermisoPerfilSuccess ({ permisos: permisos })),
                    catchError( error => of(permisoActions.getPermisoPerfilError({ payload: error })))
                    )
                )
            )
    );

    getPermisoPerfilesError$ = createEffect(
        () => this.actions$.pipe(
            ofType( permisoActions.getPermisoPerfilError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR AL OBTENER DATOS: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
                })
            ),
            {
                dispatch: false
            }
    );

    // editPerfil$ = createEffect(
    //     () => this.actions$.pipe(
    //         ofType( perfilActions.editPerfil ),
    //         concatMap( 
    //             ({perfil}) => this.perfilService.updatePerfil(perfil).pipe(
    //                 //tap( data => console.log('data user services',data)),
    //                 map( perfil => perfilActions.editPerfilSuccess ({ perfil: perfil })),
    //                 catchError( error => of(perfilActions.editPerfilError({ payload: error })))
    //                 )
    //             )
    //         )
    // );

    // deletePerfil$ = createEffect(
    //     () => this.actions$.pipe(
    //         ofType( perfilActions.deletePerfil ),
    //         concatMap( 
    //             ({perfilId}) => this.perfilService.deletePerfil(perfilId).pipe(
    //                 //tap( data => console.log('data user services',data)),
    //                 map( () => perfilActions.deletePerfilSuccess ()),
    //                 catchError( error => of(perfilActions.deletePerfilError({ payload: error })))
    //                 )
    //             )
    //         )
    // );
}