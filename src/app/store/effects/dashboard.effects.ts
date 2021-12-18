import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as dashActions from '../actions/dashboard.actions';
import { of } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Injectable()
export class DashboardEffects {
    constructor(
        private actions$: Actions,
        private dashService: DashboardService
    ) {}

    getRiesgoFactor$ = createEffect(
        () => this.actions$.pipe(
            ofType( dashActions.getRiesgosFactor),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                ({tipo}) => this.dashService.getDataChart(tipo).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( data => dashActions.getRiesgosFactorSuccess ({ data: data })),
                    catchError( error => of(dashActions.getRiesgosFactorError({ payload: error })))
                    )
                )
            )
    );

    getRiesgoFuente$ = createEffect(
        () => this.actions$.pipe(
            ofType( dashActions.getRiesgosFuente),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                ({tipo}) => this.dashService.getDataChart(tipo).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( data => dashActions.getRiesgosFuenteSuccess ({ data: data })),
                    catchError( error => of(dashActions.getRiesgosFuenteError({ payload: error })))
                    )
                )
            )
    );

    getRiesgoTipoEvento$ = createEffect(
        () => this.actions$.pipe(
            ofType( dashActions.getRiesgosTipoEvento),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                ({tipo}) => this.dashService.getDataChart(tipo).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( data => dashActions.getRiesgosTipoEventoSuccess ({ data: data })),
                    catchError( error => of(dashActions.getRiesgosTipoEventoError({ payload: error })))
                    )
                )
            )
    );

    getRIpromedio$ = createEffect(
        () => this.actions$.pipe(
            ofType( dashActions.getRIpromedio),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                ({tipo}) => this.dashService.getDataChart(tipo).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( data => dashActions.getRIpromedioSuccess ({ data: data[0] })),
                    catchError( error => of(dashActions.getRIpromedioError({ payload: error })))
                    )
                )
            )
    );

    getRRpromedio$ = createEffect(
        () => this.actions$.pipe(
            ofType( dashActions.getRRpromedio),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                ({tipo}) => this.dashService.getDataChart(tipo).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( data => dashActions.getRRpromedioSuccess ({ data: data[0] })),
                    catchError( error => of(dashActions.getRRpromedioError({ payload: error })))
                    )
                )
            )
    );

}