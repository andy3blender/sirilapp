import { createReducer, on } from '@ngrx/store';
import { InventarioProcesos } from '../../models/inventarioProcesos';
import * as inventarioActions from '../actions/inventarioProcesos.actions';
import { AppSate } from '../app.reducer';

export interface InventarioState {
   inventario: InventarioProcesos[];
   procesado: Boolean;   
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithInventario extends AppSate {
    inventario: InventarioState
}

export const inventarioInitialState: InventarioState = {
    inventario: null,
    procesado: false,
    error: null
}

const _inventarioReducer = createReducer(inventarioInitialState,
   
    on( inventarioActions.getInventarioSuccess, (state, { inventario }) => ({ 
        ...state,
        inventario: inventario, 
        procesado: true,
        error: null
     })),

     on( inventarioActions.getInventarioError, (state, { payload }) => ({ 
        ...state,
        personas: null,
        procesado: false,
        error: payload
     })),

     on( inventarioActions.insertInventarioSuccess, (state, { inventario } ) => ({ 
        ...state,
        //inventario: inventario,
        procesado: true,
        error: null
     })),

     on( inventarioActions.insertInventarioError, (state, { payload }) => ({ 
        ...state,
        procesado: false,
        error: payload
     })),

   on( inventarioActions.editInventarioSuccess, (state, { proceso }) => ({ 
        ...state,
        procesado: true,
        error: null
     })),

   on( inventarioActions.editInventarioError, (state, { payload }) => ({ 
        ...state,
        procesado: false,        
        error: payload
     })),

   on( inventarioActions.deleteInventarioSuccess, (state) => ({ 
        ...state,
        procesado: true,        
        error: null
     })),

   on( inventarioActions.deleteInventarioError, (state, { payload }) => ({ 
        ...state,
        procesado: false,        
        error: payload
     }))

);

export function inventarioReducer(state, action) {
   return _inventarioReducer(state, action);
}