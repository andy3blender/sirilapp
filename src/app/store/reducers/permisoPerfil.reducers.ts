import { createReducer, on } from '@ngrx/store';
import { permisoPerfil } from '../../models/permisoPerfil';
import * as permisoActions from '../actions/permisoPerfil.actions';
import { AppSate } from '../app.reducer';

export interface PermisoPerfilState {
   permisos: permisoPerfil[];
   procesado: Boolean;
   loaded: boolean,
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithPermisoPerfil extends AppSate {
   permisoPerfil: PermisoPerfilState
}

export const permisoPerfilInitialState: PermisoPerfilState = {
    permisos: null,
    procesado: false,
    loaded: false,
    error: null
}

const _permisoPerfilReducer = createReducer(permisoPerfilInitialState,
   
    on( permisoActions.getPermisoPerfilSuccess, (state, { permisos }) => ({ 
        ...state,
        permisos: permisos,
        loaded: true,
        error: null
     })),

     on( permisoActions.getPermisoPerfilError, (state, { payload }) => ({ 
        ...state,
        permisos: null,
        loaded: false,
        error: payload
     })),

//    on( perfilActions.addPerfilSuccess, (state ) => ({ 
//       ...state,
//       procesado: true,
//       loaded: true,
//       error: null
//    })),

//    on( perfilActions.addPerfilError, (state, { payload }) => ({ 
//       ...state,
//       procesado: false,
//       loaded: false,
//       error: payload
//    })),

//    on( perfilActions.editPerfilSuccess, (state, { perfil }) => ({ 
//       ...state,
//       procesado: true,
//       loaded: true,
//       error: null
//    })),

//  on( perfilActions.editPerfilError, (state, { payload }) => ({ 
//       ...state,
//       procesado: false,
//       loaded: false,
//       error: payload
//    })),

//  on( perfilActions.deletePerfilSuccess, (state) => ({ 
//       ...state,
//       procesado: true,
//       loaded: true,
//       error: null
//    })),

//  on( perfilActions.deletePerfilError, (state, { payload }) => ({ 
//       ...state,
//       procesado: false,
//       loaded: false,
//       error: payload
//    })),

);

export function permisoPerfilReducer(state, action) {
   return _permisoPerfilReducer(state, action);
}