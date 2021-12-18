import { createReducer, on } from '@ngrx/store';
import { Menu } from '../../models/menu';
import { getMenuByUserSuccess, getMenuByUserError } from '../actions/menu.actions';

export interface MenuState {
   menu: Menu[];
   loaded: boolean,
   error: any;
}

export const menuInitialState: MenuState = {
   menu: null,
   loaded: false,
   error: null
}

const _menuReducer = createReducer(menuInitialState,
   
    on( getMenuByUserSuccess, (state, { menu }) => ({ 
        ...state,
        menu: menu,
        loaded: true,
        error: null
     })),

     on( getMenuByUserError, (state, { payload }) => ({ 
        ...state,
        menu: null,
        loaded: false,
        error: payload
     })),

);

export function menuReducer(state, action) {
   return _menuReducer(state, action);
}