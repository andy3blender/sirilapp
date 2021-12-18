import { createReducer, on } from '@ngrx/store';
import * as inventarioActions from '../actions/inventarioControles.actions';
import { AppSate } from '../app.reducer';
import { InventarioControles } from '../../models/inventarioControles';

export interface ControlesState {
   inventario: InventarioControles[];
   procesado: Boolean;   
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithControles extends AppSate {
    control: ControlesState
}

export const controlesInitialState: ControlesState = {
    inventario: null,
    procesado: false,
    error: null
}

const _controlesReducer = createReducer(controlesInitialState,
   
    on( inventarioActions.getControlesSuccess, (state, { inventario }) => ({ 
        ...state,
        inventario: inventario, 
        procesado: true,
        error: null
     })),

     on( inventarioActions.getControlesError, (state, { payload }) => ({ 
        ...state,
        personas: null,
        procesado: false,
        error: payload
     })),

     on( inventarioActions.insertControlSuccess, (state, { inventario } ) => ({ 
        ...state,
        //inventario: inventario,
        procesado: true,
        error: null
     })),

     on( inventarioActions.insertControlError, (state, { payload }) => ({ 
        ...state,
        procesado: false,
        error: payload
     })),

   on( inventarioActions.editControlSuccess, (state, { control }) => ({ 
        ...state,
        procesado: true,
        error: null
     })),

   on( inventarioActions.editControlError, (state, { payload }) => ({ 
        ...state,
        procesado: false,        
        error: payload
     })),

   on( inventarioActions.deleteControlSuccess, (state) => ({ 
        ...state,
        procesado: true,        
        error: null
     })),

   on( inventarioActions.deleteControlError, (state, { payload }) => ({ 
        ...state,
        procesado: false,        
        error: payload
     }))

);

export function controlesReducer(state, action) {
   return _controlesReducer(state, action);
}