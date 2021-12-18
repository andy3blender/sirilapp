import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, catchError, concatMap } from "rxjs/operators";
import * as loginActions from '../actions/login.actions';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppSate } from '../app.reducer';
import { getMenuByUser } from '../actions/menu.actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private loginService: AuthService,
        private usuarioService: UsuarioService,
        private store: Store<AppSate>
    ) {}

    getLogin$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.getLogin ),    
            // tap( data => console.log('effect tap',data)),
            concatMap( 
                (us) => this.loginService.login2(us.login, us.password ).pipe(
                    // tap( data => console.log('data services',data)),
                    map( user => loginActions.getLoginSuccess({ usuario: user })),
                    catchError( error => of(loginActions.getLoginError({ payload: error })))
                    )                    
                )
            )
    );

    createMenuByLogin$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.getLoginSuccess ),
            tap( (user) => {
                //console.log('0. effect login success', user);
                this.store.dispatch( getMenuByUser( { login: user.usuario.login }) )
            })            
        ),
        {
            dispatch: false
        }
    );

    Logout$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.Logout ),    
            // concatMap( 
            //     (us) => this.loginService.login(us.login, us.password ).pipe(
                    tap( data => console.log('data services',data)),
                    map( () => loginActions.LogoutSuccess()),
                    //catchError( error => of(loginActions.getLoginError({ payload: error })))
                    )                    
                //)
    );
    //);

    updateFoto$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.updateFotoPerfil ),    
            concatMap( 
                ({personaId, foto}) => this.usuarioService.updateFoto( personaId, foto).pipe(
                    map( user => loginActions.updateFotoPerfilSuccess({ usuario: user })),
                    catchError( error => of(loginActions.updateFotoPerfilError({ payload: error })))
                    )                    
                )
            )
    );
}