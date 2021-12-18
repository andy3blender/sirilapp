import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as riesgoActions from '../actions/riesgo.actions';
import { of } from 'rxjs';
import { RiesgoService } from '../../services/riesgo.service';

@Injectable()
export class RiesgoEffects {
    constructor(
        private actions$: Actions,
        private riesgoService: RiesgoService
    ) {}

    getRiesgos$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.getRiesgos ),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                () => this.riesgoService.getRiesgos().pipe(
                    //tap( data => console.log('data user services',data)),
                    map( items => riesgoActions.getRiesgosSuccess ({ riesgos: items })),
                    catchError( error => of(riesgoActions.getRiesgosError({ payload: error })))
                    )
                )
            )
    );

    getRiesgo$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.getRiesgo ),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                ({riesgoId}) => this.riesgoService.getRiesgo(riesgoId).pipe(
                    //tap( data => console.log(data[0])),
                    map( riesgo => riesgoActions.getRiesgoSuccess ({ riesgo: riesgo[0] })),
                    catchError( error => of(riesgoActions.getRiesgoError({ payload: error })))
                    )
                )
            )
    );

    addRiesgo$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.addRiesgo ),
            concatMap( 
                ({ riesgo }) => this.riesgoService.addRiesgo(riesgo).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( riesgo => riesgoActions.addRiesgoSuccess ({ riesgo: riesgo })),
                    catchError( error => of(riesgoActions.addRiesgoError({ payload: error })))
                    )
                )
            )
    );

    editRiesgo$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.editRiesgo ),
            concatMap( 
                ({ riesgo }) => this.riesgoService.updateRiesgo(riesgo).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( riesgo => riesgoActions.editRiesgoSuccess ({ riesgo: riesgo })),
                    catchError( error => of(riesgoActions.editRiesgoError({ payload: error })))
                    )
                )
            )
    );

    deleteRiesgo$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.deleteRiesgo ),
            concatMap( 
                ({ riesgoId }) => this.riesgoService.deleteRiesgo(riesgoId).pipe(
                    //tap( data => console.log('data catalogo services',data.grupoId)),
                    map( itemEliminado => riesgoActions.deleteRiesgoSuccess ()),
                    catchError( error => of(riesgoActions.deleteRiesgoError({ payload: error })))
                    )
                )
            )
    );

    getRiesgosPorRI$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.getRiesgosPorRI ),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                ({ frecuencia, impacto }) => this.riesgoService.getRiesgosPorRI(frecuencia, impacto).pipe(
                    //tap( data => console.log(data[0])),
                    map( riesgos => riesgoActions.getRiesgosPorRISuccess ({ riesgos: riesgos })),
                    catchError( error => of(riesgoActions.getRiesgosPorRIError({ payload: error })))
                    )
                )
            )
    );

    getRiesgosPorRR$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.getRiesgosPorRR ),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                ({ frecuencia, impacto }) => this.riesgoService.getRiesgosPorRR(frecuencia, impacto).pipe(
                    //tap( data => console.log(data[0])),
                    map( riesgos => riesgoActions.getRiesgosPorRRSuccess ({ riesgos: riesgos })),
                    catchError( error => of(riesgoActions.getRiesgosPorRRError({ payload: error })))
                    )
                )
            )
    );

}