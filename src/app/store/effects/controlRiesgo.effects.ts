import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as controlActions from '../actions/controlRiesgo.actions';
import * as riesgoActions from '../actions/riesgo.actions';
import { of } from 'rxjs';
import { ControlRiesgoService } from '../../services/controlRiesgo.service';
import { Store } from '@ngrx/store';
import { AppSate } from '../app.reducer';
import { RiesgoService } from '../../services/riesgo.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';

@Injectable()
export class ControlRiesgoEffects {
    constructor(
        private actions$: Actions,
        private controlService: ControlRiesgoService,
        private riesgoService: RiesgoService,
        private store: Store<AppSate>,
        private _snackBar: MatSnackBar,
    ) {}

    // getControlesVinculados$ = createEffect(
    //     () => this.actions$.pipe(
    //         ofType( controlActions.getControlesVinculados ),
    //         concatMap( 
    //             () => this.controlService.getControlRiesgos().pipe(
    //                 //tap( data => console.log('data user services',data)),
    //                 map( items => controlActions.getControlesVinculadosSuccess ({ controles: items })),
    //                 catchError( error => of(controlActions.getControlesVinculadosError({ payload: error })))
    //                 )
    //             )
    //         )
    // );

    getControlesVinculados$ = createEffect(
        () => this.actions$.pipe(
            ofType( controlActions.getControlesVinculados ),
            concatMap( 
                () => this.riesgoService.getControlesVinculados().pipe(
                    //tap( data => console.log('data user services',data)),
                    map( items => controlActions.getControlesVinculadosSuccess ({ controles: items })),
                    catchError( error => of(controlActions.getControlesVinculadosError({ payload: error })))
                    )
                )
            )
    );

    getControlRiesgo$ = createEffect(
        () => this.actions$.pipe(
            ofType( controlActions.getControlRiesgo ),
            concatMap( 
                ({ riesgoId }) => this.controlService.getControlesRiesgo(riesgoId).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( items => controlActions.getControlRiesgoSuccess ({ controles: items })),
                    catchError( error => of(controlActions.getControlRiesgoError({ payload: error })))
                    )
                )
            )
    );

    addControlRiesgo$ = createEffect(
        () => this.actions$.pipe(
            ofType( controlActions.addControlRiesgo ),
            concatMap( 
                ({ control }) => this.controlService.addControlRiesgo(control).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( control => controlActions.addControlRiesgoSuccess ({ control: control })),
                    catchError( error => of(controlActions.addControlRiesgoError({ payload: error })))
                    )
                )
            )
    );

    editControlRiesgo$ = createEffect(
        () => this.actions$.pipe(
            ofType( controlActions.editControlRiesgo ),
            concatMap( 
                ({ control }) => this.controlService.updateControlRiesgo(control).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( control => controlActions.editControlRiesgoSuccess ({ control: control })),
                    catchError( error => of(controlActions.editControlRiesgoError({ payload: error })))
                    )
                )
            )
    );

    // editControlRiesgoSuccess$ = createEffect(
    //     () => this.actions$.pipe(
    //         ofType( controlActions.editControlRiesgoSuccess ),
    //         tap( ({control}) => {
    //             this.store.dispatch( controlActions.getControlRiesgo({riesgoId: control.eventoId}));
    //         }) 
    //     ),
    //     {
    //         dispatch: false
    //     }
    // );

    deleteControlRiesgo$ = createEffect(
        () => this.actions$.pipe(
            ofType( controlActions.deleteControlRiesgo ),
            concatMap( 
                ({ controlId }) => this.controlService.deleteControlRiesgo(controlId).pipe(
                    //tap( data => console.log('data catalogo services',data.grupoId)),
                    map( itemEliminado => controlActions.deleteControlRiesgoSuccess({ riesgoId: itemEliminado.eventoId})),
                    catchError( error => of(controlActions.deleteControlRiesgoError({ payload: error })))
                    )
                )
            )
    );

    deleteControlRiesgoSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( controlActions.deleteControlRiesgoSuccess ),
            tap( ({riesgoId}) => {
                this.store.dispatch( controlActions.getControlRiesgo({riesgoId}));
            }) 
        ),
        {
            dispatch: false
        }
    );

    deleteControlesVinculados$ = createEffect(
        () => this.actions$.pipe(
            ofType( controlActions.deleteControlesVinculados ),
            concatMap( 
                ({ riesgoId }) => this.controlService.deleteControlesVinculados(riesgoId).pipe(
                    map( () => controlActions.deleteControlesVinculadosSuccess()),
                    catchError( error => of(controlActions.deleteControlesVinculadosError({ payload: error })))
                    )
                )
            )
    );

    deleteControlesVinculadosSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( controlActions.deleteControlesVinculadosSuccess ),
            tap( () => {
                this.store.dispatch( controlActions.getControlesVinculados());

                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro eliminado correctamente`,
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

    getCalculoResidual$ = createEffect(
        () => this.actions$.pipe(
            ofType( controlActions.calculoResidual ),
            concatMap( 
                ({ control }) => this.controlService.getRiesgoResidual(control).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( control => controlActions.calculoResidualSuccess ({ control: control })),
                    catchError( error => of(controlActions.calculoResidualError({ payload: error })))
                    )
                )
            )
    );

    getCalculoResidualSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( controlActions.calculoResidualSuccess ),
            //tap( data => console.log('data user services',data)),
            tap( ({control}) => {
                this.store.dispatch( riesgoActions.getRiesgo({ riesgoId: control.eventoId}));
            }) 
        ),
        {
            dispatch: false
        }
    );

}