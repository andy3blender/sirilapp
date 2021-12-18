import { createReducer, on } from '@ngrx/store';
import { Persona } from '../../models/Persona';
import * as personaActions from '../actions/persona.actions';
import { AppSate } from '../app.reducer';

export interface PersonaState {
   personas: Persona[];
   procesado: Boolean;
   loaded: boolean,
   error: any;
}

// se agrega este state al appstate cuando se hace carga perezosa
export interface AppStateWithPersona extends AppSate {
   persona: PersonaState
}

export const personaInitialState: PersonaState = {
    personas: null,
    procesado: false,
    loaded: false,
    error: null
}

const _personaReducer = createReducer(personaInitialState,
   
    on( personaActions.getPersonasSuccess, (state, { personas }) => ({ 
        ...state,
        personas: personas,
        loaded: true,
        error: null
     })),

     on( personaActions.getPersonasError, (state, { payload }) => ({ 
        ...state,
        personas: null,
        loaded: false,
        error: payload
     })),

     on( personaActions.addPersonaSuccess, (state ) => ({ 
        ...state,
        procesado: true,
        loaded: true,
        error: null
     })),

     on( personaActions.addPersonaError, (state, { payload }) => ({ 
        ...state,
        procesado: false,
        loaded: false,
        error: payload
     })),

   on( personaActions.editPersonaSuccess, (state, { persona }) => ({ 
        ...state,
        procesado: true,
        loaded: true,
        error: null
     })),

   on( personaActions.editPersonaError, (state, { payload }) => ({ 
        ...state,
        procesado: false,
        loaded: false,
        error: payload
     })),

   on( personaActions.deletePersonaSuccess, (state) => ({ 
        ...state,
        procesado: true,
        loaded: true,
        error: null
     })),

   on( personaActions.deletePersonaError, (state, { payload }) => ({ 
        ...state,
        procesado: false,
        loaded: false,
        error: payload
     })),

);

export function personaReducer(state, action) {
   return _personaReducer(state, action);
}