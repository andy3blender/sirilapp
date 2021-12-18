import { createReducer, on } from '@ngrx/store';
import { Perfil } from '../../models/Perfil';
import * as perfilActions from '../actions/perfil.actions';
import { AppSate } from '../app.reducer';

export interface PerfilState {
   perfiles: Perfil[];
   procesado: Boolean;
   loaded: boolean,
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithPerfil extends AppSate {
   perfil: PerfilState
}

export const perfilInitialState: PerfilState = {
    perfiles: null,
    procesado: false,
    loaded: false,
    error: null
}

const _perfilReducer = createReducer(perfilInitialState,
   
    on( perfilActions.getPerfilesSuccess, (state, { perfiles }) => ({ 
        ...state,
        perfiles: perfiles,
        loaded: true,
        error: null
     })),

     on( perfilActions.getPerfilesError, (state, { payload }) => ({ 
        ...state,
        perfiles: null,
        loaded: false,
        error: payload
     })),

   on( perfilActions.addPerfilSuccess, (state ) => ({ 
      ...state,
      procesado: true,
      loaded: true,
      error: null
   })),

   on( perfilActions.addPerfilError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      loaded: false,
      error: payload
   })),

   on( perfilActions.editPerfilSuccess, ( state ) => ({ 
      ...state,
      procesado: true,
      loaded: true,
      error: null
   })),

 on( perfilActions.editPerfilError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      loaded: false,
      error: payload
   })),

 on( perfilActions.deletePerfilSuccess, (state) => ({ 
      ...state,
      procesado: true,
      loaded: true,
      error: null
   })),

 on( perfilActions.deletePerfilError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      loaded: false,
      error: payload
   })),

);

export function perfilReducer(state, action) {
   return _perfilReducer(state, action);
}