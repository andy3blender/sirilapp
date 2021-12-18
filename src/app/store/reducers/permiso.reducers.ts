import { createReducer, on } from '@ngrx/store';
import { Permiso } from 'src/app/models/permiso';
import * as permisoActions from '../actions/permiso.actions';
import { AppSate } from '../app.reducer';

export interface PermisosState {
   permisos: Permiso[];
   procesado: Boolean;
   loaded: boolean,
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithPermisos extends AppSate {
   permisos: PermisosState
}

export const permisosInitialState: PermisosState = {
    permisos: null,
    procesado: false,
    loaded: false,
    error: null
}

const _permisosReducer = createReducer(permisosInitialState,
   
   on( permisoActions.addPermisosSuccess, (state ) => ({ 
      ...state,
      procesado: true,
      loaded: true,
      error: null
   })),

   on( permisoActions.addPermisosError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      loaded: false,
      error: payload
   })),

);

export function permisosReducer(state, action) {
   return _permisosReducer(state, action);
}