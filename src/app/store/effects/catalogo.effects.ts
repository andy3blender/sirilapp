import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, tap } from "rxjs/operators";
import * as catalogoActions from '../actions/catalogo.actions';
import { of } from 'rxjs';
import { CatalogoService } from '../../services/catalogo.service';

@Injectable()
export class CatalogoEffects {
    constructor(
        private actions$: Actions,
        private catalogoService: CatalogoService
    ) {}

    getCatalogoItems$ = createEffect(
        () => this.actions$.pipe(
            ofType( catalogoActions.getCatalogo ),
            //tap( data => console.log('effect tap',data)),
            concatMap( 
                ({grupoId}) => this.catalogoService.getCatalogoItems(grupoId).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( items => catalogoActions.getCatalogoSuccess ({ catalogos: items })),
                    catchError( error => of(catalogoActions.getCatalogoError({ payload: error })))
                    )
                )
            )
    );

    addCatalogoItem$ = createEffect(
        () => this.actions$.pipe(
            ofType( catalogoActions.addCatalogo ),
            concatMap( 
                ({ catalogo }) => this.catalogoService.addCatalogoItem(catalogo).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( catalogo => catalogoActions.addCatalogoSuccess ({ catalogo: catalogo })),
                    catchError( error => of(catalogoActions.addCatalogoError({ payload: error })))
                    )
                )
            )
    );

    editCatalogoItem$ = createEffect(
        () => this.actions$.pipe(
            ofType( catalogoActions.editCatalogo ),
            concatMap( 
                ({ catalogo }) => this.catalogoService.updateCatalogoItem(catalogo).pipe(
                    //tap( data => console.log('data user services',data)),
                    map( catalogo => catalogoActions.editCatalogoSuccess ({ catalogo: catalogo })),
                    catchError( error => of(catalogoActions.editCatalogoError({ payload: error })))
                    )
                )
            )
    );

    deleteCatalogoItem$ = createEffect(
        () => this.actions$.pipe(
            ofType( catalogoActions.deleteCatalogo ),
            concatMap( 
                ({ catalogoId }) => this.catalogoService.deleteCatalogoItem(catalogoId).pipe(
                    //tap( data => console.log('data catalogo services',data.grupoId)),
                    map( itemEliminado => catalogoActions.deleteCatalogoSuccess ({ grupoId: itemEliminado.grupoId})),
                    catchError( error => of(catalogoActions.deleteCatalogoError({ payload: error })))
                    )
                )
            )
    );

}