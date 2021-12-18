import { createReducer, on } from '@ngrx/store';
import { Riesgo } from 'src/app/models/riesgo';
import * as riesgoActions from '../actions/riesgo.actions';
import { AppSate } from '../app.reducer';

export interface RiesgoState {
   riesgos: Riesgo[];
   unRiesgo: Riesgo;
   procesado: Boolean;
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithRiesgo extends AppSate {
   riesgo: RiesgoState
}

export const riesgoInitialState: RiesgoState = {
    riesgos: null,
    unRiesgo: null,
    procesado: false,
    error: null
}

const _riesgoReducer = createReducer(riesgoInitialState,
   
    on( riesgoActions.getRiesgosSuccess, (state, { riesgos }) => ({ 
        ...state,
        riesgos: riesgos,
        procesado: true,
        error: null
    })),

    on( riesgoActions.getRiesgosError, (state, { payload }) => ({ 
        ...state,
        riesgos: null,
        procesado: false,
        error: payload
    })),

    on( riesgoActions.getRiesgoSuccess, (state, { riesgo }) => ({ 
      ...state,
      unRiesgo: riesgo,
      procesado: true,
      error: null
    })),

    on( riesgoActions.getRiesgoError, (state, { payload }) => ({ 
      ...state,
      unRiesgo: null,
      procesado: false,
      error: payload
    })),

    on( riesgoActions.addRiesgoSuccess, (state ) => ({ 
      ...state,
      procesado: true,
      error: null
    })),

    on( riesgoActions.addRiesgoError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      error: payload
    })),

    on( riesgoActions.editRiesgoSuccess, (state, { riesgo }) => ({ 
      ...state,
      procesado: true,
      error: null
    })),

    on( riesgoActions.editRiesgoError, (state, { payload }) => ({ 
      ...state,
      procesado: false,      
      error: payload
    })),

    on( riesgoActions.deleteRiesgoSuccess, (state) => ({ 
      ...state,
      procesado: true,      
      error: null
    })),

    on( riesgoActions.deleteRiesgoError, (state, { payload }) => ({ 
      ...state,
      procesado: false,    
      error: payload
    })),

    on( riesgoActions.getRiesgosPorRISuccess, (state, { riesgos }) => ({ 
      ...state,
      riesgos: riesgos,
      procesado: true,
      error: null
  })),

  on( riesgoActions.getRiesgosPorRIError, (state, { payload }) => ({ 
      ...state,
      riesgos: null,
      procesado: false,
      error: payload
  })),

  on( riesgoActions.getRiesgosPorRRSuccess, (state, { riesgos }) => ({ 
    ...state,
    riesgos: riesgos,
    procesado: true,
    error: null
})),

on( riesgoActions.getRiesgosPorRRError, (state, { payload }) => ({ 
    ...state,
    riesgos: null,
    procesado: false,
    error: payload
})),

);

export function riesgoReducer(state, action) {
   return _riesgoReducer(state, action);
}