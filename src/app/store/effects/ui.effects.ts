import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, tap, map, catchError, concatMap } from "rxjs/operators";
import * as uiActions from '../actions/ui.actions';
import { of } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Injectable()
export class UiEffects {
    constructor(
        private actions$: Actions,
        private menuService: MenuService
    ) {}

    getBreadCrumb$ = createEffect(
        () => this.actions$.pipe(
            ofType( uiActions.getBreadcrumb ),    
            // tap( data => console.log('effect tap',data)),
            concatMap( 
                (ruta) => this.menuService.getBreadcrumb(ruta.modulo, ruta.item ).pipe(
                    // tap( data => console.log('data services',data)),
                    map( url => uiActions.setBreadcrumb({ ruta: url })),
                    catchError( error => of(uiActions.setBreadcrumbError({ payload: error })))
                    )                    
                )
            )
    );

    // setBreadCrumb$ = createEffect(
    //     () => this.actions$.pipe(
    //         ofType( uiActions.setBreadcrumb ),
    //         tap( (ruta) => {
    //             console.log('url bread', ruta.modulo, ruta.item );
    //             //this.store.dispatch( getMenuByUser( { login: user.usuario.login }) )
    //         })            
    //     ),
    //     {
    //         dispatch: false
    //     }        
    // );
}