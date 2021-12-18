import { createReducer, on } from '@ngrx/store';
import * as catalogoActions from '../actions/catalogo.actions';
import { AppSate } from '../app.reducer';
import { CatalogoGeneral } from '../../models/catalogoGeneral';

export interface CatalogoState {
   catalogo: CatalogoGeneral[];
   procesado: Boolean;
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithCatalogo extends AppSate {
   catalogo: CatalogoState
}

export const catalogoInitialState: CatalogoState = {
    catalogo: null,
    procesado: false,
    error: null
}

const _catalogoReducer = createReducer(catalogoInitialState,
   
    on( catalogoActions.getCatalogoSuccess, (state, { catalogos }) => ({ 
        ...state,
        catalogo: catalogos,        
        procesado: true,
        error: null
    })),

    on( catalogoActions.getCatalogoError, (state, { payload }) => ({ 
        ...state,
        catalogo: null,
        procesado: false,
        error: payload
    })),

    on( catalogoActions.addCatalogoSuccess, (state ) => ({ 
      ...state,
      procesado: true,
      error: null
    })),

    on( catalogoActions.addCatalogoError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      error: payload
    })),

    on( catalogoActions.editCatalogoSuccess, (state, { catalogo }) => ({ 
      ...state,
      //catalogo: catalogo,  
      procesado: true,
      error: null
    })),

    on( catalogoActions.editCatalogoError, (state, { payload }) => ({ 
      ...state,
      procesado: false,      
      error: payload
    })),

    on( catalogoActions.deleteCatalogoSuccess, (state) => ({ 
      ...state,
      procesado: true,      
      error: null
    })),

    on( catalogoActions.deleteCatalogoError, (state, { payload }) => ({ 
      ...state,
      procesado: false,    
      error: payload
    })),

);

export function catalogoReducer(state, action) {
   return _catalogoReducer(state, action);
}