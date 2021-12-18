import { createReducer, on } from '@ngrx/store';
import * as mapaActions from '../actions/mapa.actions';
import { AppSate } from '../app.reducer';
import { Mapas } from '../../models/mapas';

export interface MapaState {
   mapa: Mapas[];
   mapaRR: Mapas[];
   procesado: Boolean;
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithMapa extends AppSate {
   mapa: MapaState
}

export const mapaInitialState: MapaState = {
    mapa: null,
    mapaRR: null,
    procesado: false,
    error: null
}

const _mapaReducer = createReducer(mapaInitialState,
   
    on( mapaActions.getMapaRISuccess, (state, { mapa }) => ({ 
        ...state,
        mapa: mapa,
        procesado: true,
        error: null
    })),

    on( mapaActions.getMapaRIError, (state, { payload }) => ({ 
        ...state,
        mapa: null,
        procesado: false,
        error: payload
    })),

    on( mapaActions.getMapaRRSuccess, (state, { mapa }) => ({ 
        ...state,
        mapaRR: mapa,
        procesado: true,
        error: null
    })),

    on( mapaActions.getMapaRRError, (state, { payload }) => ({ 
        ...state,
        mapaRR: null,
        procesado: false,
        error: payload
    })),


);

export function mapaReducer(state, action) {
   return _mapaReducer(state, action);
}