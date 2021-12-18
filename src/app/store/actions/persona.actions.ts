import { createAction, props } from '@ngrx/store';
import { Persona } from '../../models/Persona';

export const getPersonas = createAction('[Persona] Get persona');
export const getPersonasSuccess = createAction('[Persona] Get persona success', props<{ personas: Persona[] }>());
export const getPersonasError = createAction('[Persona] Get persona error', props<{ payload: any  }>());

export const addPersona = createAction('[Persona] Add persona', props<{ persona: Persona }>());
export const addPersonaSuccess = createAction('[Persona] Add persona success');
export const addPersonaError = createAction('[Persona] Add persona error', props<{ payload: any  }>());

// export const personaExists = createAction('[Persona] Check persona exists', props<{ personaId: string }>());
// export const personaExistsSuccess = createAction('[Persona] Check persona exists success', props<{ exists: Boolean }>());
// export const personaExistsError = createAction('[Persona] Check persona exists error', props<{ payload: any  }>());

export const editPersona = createAction('[Persona] Edit persona', props<{ persona: Persona }>());
export const editPersonaSuccess = createAction('[Persona] Edit persona success', props<{ persona: Persona }>());
export const editPersonaError = createAction('[Persona] Edit persona error', props<{ payload: any  }>());

export const deletePersona = createAction('[Persona] Delete persona', props<{ personaId: string }>());
export const deletePersonaSuccess = createAction('[Persona] Delete persona success');
export const deletePersonaError = createAction('[Persona] Delete persona error', props<{ payload: any  }>());