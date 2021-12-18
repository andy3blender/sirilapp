import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as inventarioActions from '../actions/inventarioProcesos.actions';
import { of } from 'rxjs';
import { InventarioProcesosService } from "src/app/services/inventarioProcesos.service";

import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';
import { Store } from '@ngrx/store';
import { AppStateWithInventario } from '../reducers/inventarioProcesos.reducers';

@Injectable()
export class InventarioProcesosEffects {
    constructor(
        private actions$: Actions,
        private inventarioService: InventarioProcesosService,         
        private _snackBar: MatSnackBar,  
        private store: Store<AppStateWithInventario>
    ) {}

    getInventario$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.getInventario ),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                () => this.inventarioService.getInventario().pipe(
                    //tap( data => console.log('data user services',data)),
                    map( inventario => inventarioActions.getInventarioSuccess ({ inventario: inventario })),
                    catchError( error => of(inventarioActions.getInventarioError({ payload: error })))
                    )
                )
            )
    );

    insertInventario$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.insertInventario ),
            concatMap( 
                ({ proceso }) => 
                    this.inventarioService.addProceso(proceso).pipe(
                    map( inventario => inventarioActions.insertInventarioSuccess({ inventario: inventario })),
                    catchError( error => of(inventarioActions.insertInventarioError({ payload: error })))
                    )
                )
            )
    );

    addInventarioSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.insertInventarioSuccess ),
            tap( (e) => {
                this.store.dispatch( inventarioActions.getInventario() );
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
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

    addInventarioError$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.insertInventarioError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
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

    editInventario$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.editInventario ),
            concatMap( 
                ({proceso}) => this.inventarioService.updateProceso(proceso).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( proceso => inventarioActions.editInventarioSuccess ({ proceso: proceso })),
                    catchError( error => of(inventarioActions.editInventarioError({ payload: error })))
                    )
                )
            )
    );

    editInventarioSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.editInventarioSuccess ),
            tap( (e) => {
                this.store.dispatch( inventarioActions.getInventario() );
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro actualizado correctamente`,
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

    editInventarioError$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.editInventarioError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
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

    deleteInventario$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.deleteInventario ),
            concatMap( 
                ({procesoId}) => this.inventarioService.deleteProceso(procesoId).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( () => inventarioActions.deleteInventarioSuccess ()),
                    catchError( error => of(inventarioActions.deleteInventarioError({ payload: error })))
                    )
                )
            )
    );

    deleteInventarioSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.deleteInventarioSuccess ),
            tap( (e) => {
                this.store.dispatch( inventarioActions.getInventario() );
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro elimiado correctamente`,
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

    deleteInventarioError$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.deleteInventarioError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
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