import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as permisoActions from '../actions/permiso.actions';
import { of } from 'rxjs';
import { PerfilService } from "src/app/services/perfil.service";
// import { Store } from '@ngrx/store';
// import { AppStateWithPerfil } from '../reducers/perfil.reducers';
// import { addPermisos } from '../actions/permiso.actions';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';

@Injectable()
export class PermisosEffects {
    constructor(
        private actions$: Actions,
        private perfilService: PerfilService,  
        private _snackBar: MatSnackBar,
        //private store: Store<AppStateWithPerfil>
    ) {}

    addPermisos$ = createEffect(
        () => this.actions$.pipe(
            ofType( permisoActions.addPermisos ),
            concatMap( 
                ( { perfilId, permiso }) => this.perfilService.addPermisos(perfilId, permiso).pipe(
                    map( perfil => permisoActions.addPermisosSuccess()),
                    catchError( error => of(permisoActions.addPermisosError({ payload: error })))
                    )
                )
            )
    );

    editPermisos$ = createEffect(
        () => this.actions$.pipe(
            ofType( permisoActions.editPermisos ),
            concatMap( 
                ( { perfilId, permiso }) => this.perfilService.updatePermisos(perfilId, permiso).pipe(
                    map( perfil => permisoActions.editPermisosSuccess()),
                    catchError( error => of(permisoActions.editPermisosError({ payload: error })))
                    )
                )
            )
    );

    editPermisosSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( permisoActions.editPermisosSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro EDITADO correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    editPermisosError$ = createEffect(
        () => this.actions$.pipe(
            ofType( permisoActions.editPermisosError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR ACTUALIZANDO PERMISOS: ${e.payload}`,
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

}