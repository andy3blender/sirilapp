import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';
import {ActionReducer, INIT, MetaReducer} from '@ngrx/store';
import * as loginActions from './actions';

export interface AppSate {
    ui: reducers.State;
    login: reducers.LoginState;
    menu: reducers.MenuState;
    //usuario: reducers.UsuarioState;
    //persona: reducers.PersonaState; //cargado en lazy load
}

export const appReducers: ActionReducerMap<AppSate> = {
    ui: reducers.uiReducer,
    login: reducers.loginReducer,
    menu: reducers.menuReducer,
    //usuario: reducers.usuarioReducer,
    //persona: reducers.personaReducer
}

export function logout(reducer: ActionReducer<AppSate>): ActionReducer<AppSate> {
    return (state, action) => {
      if ( action != null && action.type === loginActions.Logout.type) {
        return reducer( undefined, {type: INIT});
      }
      return reducer(state, action);
    };
  }
  
export const metaReducers: MetaReducer<AppSate>[] = [ logout ];