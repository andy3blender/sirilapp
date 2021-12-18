import { createReducer, on } from '@ngrx/store';
import { personaUsuario } from '../../models/personaUsuario';
import * as usuarioActions from '../actions/usuario.actions';
import { AppSate } from '../app.reducer';

export interface UsuarioState {
   usuarios: personaUsuario[];
   //usuario: Usuario,
   procesado: Boolean;
   loaded: boolean,
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithUsuario extends AppSate {
   usuario: UsuarioState
}

export const usuarioInitialState: UsuarioState = {
    usuarios: null,
    //usuario: null,
    procesado: false,
    loaded: false,
    error: null
}

const _usuarioReducer = createReducer(usuarioInitialState,
   
    on( usuarioActions.getUsuariosSuccess, (state, { usuarios }) => ({ 
        ...state,
        usuarios: usuarios,
        loaded: true,
        error: null
     })),

     on( usuarioActions.getUsuariosError, (state, { payload }) => ({ 
        ...state,
        usuarios: null,
        loaded: false,
        error: payload
     })),

     on( usuarioActions.addUsuarioSuccess, (state ) => ({ 
      ...state,
      procesado: true,
      loaded: true,
      error: null
   })),

   on( usuarioActions.addUsuarioError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      loaded: false,
      error: payload
   })),

   on( usuarioActions.editUsuarioSuccess, (state, { usuario }) => ({ 
      ...state,
      procesado: true,
      loaded: true,
      error: null
   })),

   on( usuarioActions.editUsuarioError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      loaded: false,
      error: payload
   })),

   on( usuarioActions.deleteUsuarioSuccess, (state) => ({ 
      ...state,
      procesado: true,
      loaded: true,
      error: null
   })),

   on( usuarioActions.deleteUsuarioError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      loaded: false,
      error: payload
   })),

   on( usuarioActions.updatePasswordSuccess, (state) => ({ 
      ...state,
      procesado: true,
      loaded: true,
      error: null
   })),

   on( usuarioActions.updatePasswordError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      loaded: false,
      error: payload
   })),

);

export function usuarioReducer(state, action) {
   return _usuarioReducer(state, action);
}