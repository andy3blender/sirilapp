import { createReducer, on } from '@ngrx/store';
import * as uiActions from '../actions/ui.actions';

export interface State {
   ruta: string;
   error: any
}

export const initialState: State = {
   ruta: null,
   error: null
}

const _uiReducer = createReducer(initialState,
   on( uiActions.setBreadcrumb, (state, { ruta }) => ({ 
      ...state,
      ruta: ruta,
      error: null
   }) ),
   on( uiActions.setBreadcrumbError, (state, { payload }) => ({ 
      ...state, 
      ruta: null,
      error: payload
   }) ),
);

export function uiReducer(state, action) {
   return _uiReducer(state, action);
}