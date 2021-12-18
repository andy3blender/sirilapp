import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as inventarioActions from '../actions/inventarioControles.actions';
import { of } from 'rxjs';
import { InventarioControlesService } from "src/app/services/inventarioControles.service";

import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';
import { Store } from '@ngrx/store';
import { AppStateWithControles } from '../reducers/inventarioControles.reducers';

@Injectable()
export class InventarioControlesEffects {
    constructor(
        private actions$: Actions,
        private inventarioService: InventarioControlesService,
        private _snackBar: MatSnackBar,  
        private store: Store<AppStateWithControles>
    ) {}

    getInventario$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.getControles ),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                () => this.inventarioService.getInventario().pipe(
                    //tap( data => console.log('data user services',data)),
                    map( inventario => inventarioActions.getControlesSuccess ({ inventario: inventario })),
                    catchError( error => of(inventarioActions.getControlesError({ payload: error })))
                    )
                )
            )
    );

    insertInventario$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.insertControl ),
            concatMap( 
                ({ control }) => 
                    this.inventarioService.addControl(control).pipe(
                    map( inventario => inventarioActions.insertControlSuccess({ inventario: inventario })),
                    catchError( error => of(inventarioActions.insertControlError({ payload: error })))
                    )
                )
            )
    );

    addInventarioSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.insertControlSuccess ),
            tap( (e) => {
                this.store.dispatch( inventarioActions.getControles() );
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
            ofType( inventarioActions.insertControlError ),
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
            ofType( inventarioActions.editControl ),
            concatMap( 
                ({control}) => this.inventarioService.updateControl(control).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( control => inventarioActions.editControlSuccess ({ control: control })),
                    catchError( error => of(inventarioActions.editControlError({ payload: error })))
                    )
                )
            )
    );

    editInventarioSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.editControlSuccess ),
            tap( (e) => {
                this.store.dispatch( inventarioActions.getControles() );
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
            ofType( inventarioActions.editControlError ),
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
            ofType( inventarioActions.deleteControl ),
            concatMap( 
                ({ controlId }) => this.inventarioService.deleteControl(controlId).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( () => inventarioActions.deleteControlSuccess ()),
                    catchError( error => of(inventarioActions.deleteControlError({ payload: error })))
                    )
                )
            )
    );

    deleteInventarioSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.deleteControlSuccess ),
            tap( (e) => {
                this.store.dispatch( inventarioActions.getControles() );
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
            ofType( inventarioActions.deleteControlError ),
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