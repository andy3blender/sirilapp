import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from "rxjs/operators";
import * as loginActions from '../actions/login.actions';
import { Router } from "@angular/router";

@Injectable()
export class RouteEffects {
    constructor(
        private actions$: Actions,
        private route: Router
    ) {}

    goToHome$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.getLoginSuccess ),
            tap( () => this.route.navigate(['/']) )
        ),
        {
            dispatch: false
        }
    );

    logoutSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.LogoutSuccess ),
            tap( () => this.route.navigate(['login']) )
        ),
        {
            dispatch: false
        }
    );

}