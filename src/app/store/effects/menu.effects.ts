import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as menuActions from '../actions/menu.actions';
import { of } from 'rxjs';
import { MenuService } from "src/app/services/menu.service";


@Injectable()
export class MenuEffects {
    constructor(
        private actions$: Actions,
        private menuService: MenuService
    ) {}

    getMenu$ = createEffect(
        () => this.actions$.pipe(
            ofType( menuActions.getMenuByUser ),    
            // tap( data => console.log('effect tap',data)),
            concatMap( 
                ( {login} ) => this.menuService.getMenuByUser( login ).pipe(
                    // tap( data => console.log('data services',data)),
                    map( menu => menuActions.getMenuByUserSuccess ({ menu: menu })),
                    catchError( error => of(menuActions.getMenuByUserError({ payload: error })))
                    )
                )
            )
    );

    // getMenuByUserSuccess$ = createEffect(
    //     () => this.actions$.pipe(
    //         ofType( menuActions.getMenuByUserSuccess ),
    //         tap( ({menu}) => {
    //             console.log('1. effect menu success', menu);                
    //         })            
    //     ),
    //     {
    //         dispatch: false
    //     }
    // );

   
}