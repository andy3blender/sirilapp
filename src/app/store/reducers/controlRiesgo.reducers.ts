import { createReducer, on } from '@ngrx/store';
import * as controlActions from '../actions/controlRiesgo.actions';
import { AppSate } from '../app.reducer';
import { ControlRiesgo } from '../../models/controlRiesgo';
import { ControlesVinculados } from '../../models/controlesVinculados';

export interface ControlRiesgoState {
   controlRiesgo: ControlRiesgo[];
   controlesVinculados: ControlesVinculados[];
   procesado: Boolean;
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithControlRiesgo extends AppSate {
    controlRiesgo: ControlRiesgoState
}

export const controlRiesgoInitialState: ControlRiesgoState = {
    controlRiesgo: null,
    controlesVinculados: null,
    procesado: false,
    error: null
}

const _controlRiesgoReducer = createReducer(controlRiesgoInitialState,
   
  on( controlActions.getControlesVinculadosSuccess, (state, { controles }) => ({ 
    ...state,
    controlesVinculados: controles,
    procesado: true,
    error: null
  })),
  
  on( controlActions.getControlesVinculadosError, (state, { payload }) => ({ 
      ...state,
      controlesVinculados: null,
      procesado: false,
      error: payload
  })),

    on( controlActions.getControlRiesgoSuccess, (state, { controles }) => ({ 
        ...state,
        controlRiesgo: controles,
        procesado: true,
        error: null
    })),

    on( controlActions.getControlRiesgoError, (state, { payload }) => ({ 
        ...state,
        controlRiesgo: null,
        procesado: false,
        error: payload
    })),

    on( controlActions.addControlRiesgoSuccess, (state ) => ({ 
      ...state,
      procesado: true,
      error: null
    })),

    on( controlActions.addControlRiesgoError, (state, { payload }) => ({ 
      ...state,
      procesado: false,
      error: payload
    })),

    on( controlActions.editControlRiesgoSuccess, (state, { control }) => ({ 
      ...state,
      procesado: true,
      error: null
    })),

    on( controlActions.editControlRiesgoError, (state, { payload }) => ({ 
      ...state,
      procesado: false,      
      error: payload
    })),

    on( controlActions.deleteControlRiesgoSuccess, (state) => ({ 
      ...state,
      procesado: true,      
      error: null
    })),

    on( controlActions.deleteControlRiesgoError, (state, { payload }) => ({ 
      ...state,
      procesado: false,    
      error: payload
    })),

    on( controlActions.deleteControlesVinculadosSuccess, (state) => ({ 
      ...state,
      procesado: true,      
      error: null
    })),

    on( controlActions.deleteControlesVinculadosError, (state, { payload }) => ({ 
      ...state,
      procesado: false,    
      error: payload
    })),

    on( controlActions.calculoResidualSuccess, (state, { control }) => ({ 
      ...state,
      procesado: true,
      error: null
    })),

    on( controlActions.calculoResidualError, (state, { payload }) => ({ 
      ...state,
      procesado: false,      
      error: payload
    })),

);

export function controlRiesgoReducer(state, action) {
   return _controlRiesgoReducer(state, action);
}