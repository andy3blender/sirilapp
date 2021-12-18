import { createReducer, on } from '@ngrx/store';
import * as dashActions from '../actions/dashboard.actions';
import { AppSate } from '../app.reducer';
import { Dashboard } from '../../models/dashboard';

export interface DashboardState {
   riesgoFactor: Dashboard[];
   riesgoFuente: Dashboard[];
   riesgoTipoEvento: Dashboard[];
   riPromedio: Dashboard;
   rrPromedio: Dashboard;
   procesado: Boolean;
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithDash extends AppSate {
    dash: DashboardState
}

export const dashInitialState: DashboardState = {
    riesgoFactor: null,
    riesgoFuente: null,
    riesgoTipoEvento: null,
    riPromedio: null,
    rrPromedio: null,
    procesado: false,
    error: null
}

const _dashReducer = createReducer(dashInitialState,
   
  on( dashActions.getRiesgosFactorSuccess, (state, { data }) => ({ 
    ...state,
    riesgoFactor: data,
    procesado: true,
    error: null
  })),
  
  on( dashActions.getRiesgosFactorError, (state, { payload }) => ({ 
      ...state,
      riesgoFactor: null,
      procesado: false,
      error: payload
  })),

  on( dashActions.getRiesgosFuenteSuccess, (state, { data }) => ({ 
    ...state,
    riesgoFuente: data,
    procesado: true,
    error: null
  })),
  
  on( dashActions.getRiesgosFuenteError, (state, { payload }) => ({ 
      ...state,
      riesgoFuente: null,
      procesado: false,
      error: payload
  })),

  on( dashActions.getRiesgosTipoEventoSuccess, (state, { data }) => ({ 
    ...state,
    riesgoTipoEvento: data,
    procesado: true,
    error: null
  })),
  
  on( dashActions.getRiesgosTipoEventoError, (state, { payload }) => ({ 
      ...state,
      riesgoTipoEvento: null,
      procesado: false,
      error: payload
  })),

  on( dashActions.getRIpromedioSuccess, (state, { data }) => ({ 
    ...state,
    riPromedio: data,
    procesado: true,
    error: null
  })),
  
  on( dashActions.getRIpromedioError, (state, { payload }) => ({ 
      ...state,
      riPromedio: null,
      procesado: false,
      error: payload
  })),

  on( dashActions.getRRpromedioSuccess, (state, { data }) => ({ 
    ...state,
    rrPromedio: data,
    procesado: true,
    error: null
  })),
  
  on( dashActions.getRRpromedioError, (state, { payload }) => ({ 
      ...state,
      rrPromedio: null,
      procesado: false,
      error: payload
  })),
    
);

export function dashReducer(state, action) {
   return _dashReducer(state, action);
}