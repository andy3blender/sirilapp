import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario';
import { browserReload, getLoginError, getLoginSuccess, Logout, LogoutSuccess, updateFotoPerfil, updateFotoPerfilSuccess } from '../actions';
import { personaUsuario } from '../../models/personaUsuario';
import { updateFotoPerfilError } from '../actions/login.actions';

export interface LoginState {
   user: personaUsuario;
   // loading: boolean,
   authenticated: boolean,
   error: any;
}

export const loginInitialState: LoginState = {
   // user: {
   //     usuarioId: null,
   //     personaId: null,
   //     login: null,
   //     clave: null,
   //     perfilId: null,
   //     estado: null 
   // },
   user: null,
   authenticated: false,
   error: null
}

const _loginReducer = createReducer(loginInitialState,
   
    on( getLoginSuccess, browserReload, (state, { usuario }) => ({ 
        ...state,
        user: usuario,
        authenticated: true,
        error: null      
     })),

     on( getLoginError, (state, { payload }) => ({ 
        ...state,
        user: null,
        authenticated: false,
        error: payload
     })),

     on( updateFotoPerfilSuccess, (state, { usuario }) => ({ 
      ...state,
      user: usuario,
      authenticated: false,
      error: null
     })),

     on( updateFotoPerfilError, (state, { payload }) => ({ 
      ...state,
      error: payload
     })),

     on( LogoutSuccess, (state) => ({ 
      ...state,
      user: null,
      authenticated: false,
      error: null
   })),

);

export function loginReducer(state, action) {
   return _loginReducer(state, action);
}