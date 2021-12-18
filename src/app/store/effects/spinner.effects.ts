import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from "ngx-spinner";
import { tap } from "rxjs/operators";
import * as loginActions from '../actions/login.actions';

@Injectable()
export class SpinnerEffects {
    constructor(
        private actions$: Actions,
        private spinner: NgxSpinnerService
    ) {}

    spinnerOn$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.getLogin ),    
            tap( () => this.spinner.show())            
        ),
        {
            dispatch: false
        }
    );

    spinnerOff$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.getLoginSuccess, loginActions.getLoginError ),    
            tap( () => {
                setTimeout(() => { //remover en produccion!!!
                    this.spinner.hide();    
                }, 1000);                
            })            
        ),
        {
            dispatch: false
        }
    );
}