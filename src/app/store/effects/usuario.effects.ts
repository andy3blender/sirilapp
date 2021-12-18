import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as usuarioActions from '../actions/usuario.actions';
import { of } from 'rxjs';
import { UsuarioService } from "src/app/services/usuario.service";

@Injectable()
export class UsuarioEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ) {}

    getUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.getUsuarios ),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                () => this.usuarioService.getPersonaUsuario().pipe(
                    //tap( data => console.log('data user services',data)),
                    map( usuarios => usuarioActions.getUsuariosSuccess ({ usuarios: usuarios })),
                    catchError( error => of(usuarioActions.getUsuariosError({ payload: error })))
                    )
                )
            )
    );

    addUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.addUsuario ),
            concatMap( 
                ({usuario}) => this.usuarioService.addUsuario(usuario).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( usuario => usuarioActions.addUsuarioSuccess ({ usuario: usuario })),
                    catchError( error => of(usuarioActions.addUsuarioError({ payload: error })))
                    )
                )
            )
    );

    editUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.editUsuario ),
            concatMap( 
                ({usuario}) => this.usuarioService.updateUsuario(usuario).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( usuario => usuarioActions.editUsuarioSuccess ({ usuario: usuario })),
                    catchError( error => of(usuarioActions.editUsuarioError({ payload: error })))
                    )
                )
            )
    );

    deleteUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.deleteUsuario ),
            concatMap( 
                ({usuarioId}) => this.usuarioService.deleteUsuario(usuarioId).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( () => usuarioActions.deleteUsuarioSuccess ()),
                    catchError( error => of(usuarioActions.deleteUsuarioError({ payload: error })))
                    )
                )
            )
    );

    updatePassword$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.updatePassword ),
            concatMap( 
                ({usuarioId, nuevoPass}) => this.usuarioService.updatePassword(usuarioId, nuevoPass).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( () => usuarioActions.updatePasswordSuccess()),
                    catchError( error => of(usuarioActions.updatePasswordError({ payload: error })))
                    )
                )
            )
    );

}