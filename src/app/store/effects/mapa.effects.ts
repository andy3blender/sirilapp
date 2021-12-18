import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as mapaActions from '../actions/mapa.actions';
import { of } from 'rxjs';
import { MapaService } from '../../services/mapas.service';

@Injectable()
export class MapaEffects {
    constructor(
        private actions$: Actions,
        private mapaService: MapaService
    ) {}

    getMapaRI$ = createEffect(
        () => this.actions$.pipe(
            ofType( mapaActions.getMapaRI),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                () => this.mapaService.getMapa().pipe(
                    //tap( data => console.log('data user services',data)),
                    map( mapa => mapaActions.getMapaRISuccess ({ mapa: mapa })),
                    catchError( error => of(mapaActions.getMapaRIError({ payload: error })))
                    )
                )
            )
    );

    getMapaRR$ = createEffect(
        () => this.actions$.pipe(
            ofType( mapaActions.getMapaRR),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                () => this.mapaService.getMapaRR().pipe(
                    //tap( data => console.log('data user services',data)),
                    map( mapa => mapaActions.getMapaRRSuccess ({ mapa: mapa })),
                    catchError( error => of(mapaActions.getMapaRRError({ payload: error })))
                    )
                )
            )
    );


}