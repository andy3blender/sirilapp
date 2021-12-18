import { createAction, props } from '@ngrx/store';
import { Riesgo } from 'src/app/models/riesgo';

export const getRiesgos = createAction('[Riesgo] Get Riesgos');
export const getRiesgosSuccess = createAction('[Riesgo] Get Riesgos success', props<{ riesgos: Riesgo[] }>());
export const getRiesgosError = createAction('[Riesgo] Get Riesgos error', props<{ payload: any  }>());

export const getRiesgo = createAction('[Riesgo] Get Riesgo', props<{ riesgoId: number }>());
export const getRiesgoSuccess = createAction('[Riesgo] Get Riesgo success', props<{ riesgo: Riesgo }>());
export const getRiesgoError = createAction('[Riesgo] Get Riesgo error', props<{ payload: any  }>());

export const addRiesgo = createAction('[Riesgo] Add Riesgo', props<{ riesgo: Riesgo }>());
export const addRiesgoSuccess = createAction('[Riesgo] Add Riesgo success', props<{ riesgo: Riesgo }>());
export const addRiesgoError = createAction('[Riesgo] Add Riesgo error', props<{ payload: any  }>());

export const editRiesgo = createAction('[Riesgo] Edit Riesgo', props<{ riesgo: Riesgo }>());
export const editRiesgoSuccess = createAction('[Riesgo] Edit Riesgo success', props<{ riesgo: Riesgo }>());
export const editRiesgoError = createAction('[Riesgo] Edit Riesgo error', props<{ payload: any  }>());

export const deleteRiesgo = createAction('[Riesgo] Delete Riesgo', props<{ riesgoId: number }>());
export const deleteRiesgoSuccess = createAction('[Riesgo] Delete Riesgo success');
export const deleteRiesgoError = createAction('[Riesgo] Delete Riesgo error', props<{ payload: any  }>());

export const getRiesgosPorRI = createAction('[Riesgo] Get Riesgos por RI', props<{ frecuencia: number, impacto: number }>());
export const getRiesgosPorRISuccess = createAction('[Riesgo] Get Riesgos por RI success', props<{ riesgos: Riesgo[] }>());
export const getRiesgosPorRIError = createAction('[Riesgo] Get Riesgos por RI error', props<{ payload: any  }>());

export const getRiesgosPorRR = createAction('[Riesgo] Get Riesgos por RR', props<{ frecuencia: number, impacto: number }>());
export const getRiesgosPorRRSuccess = createAction('[Riesgo] Get Riesgos por RR success', props<{ riesgos: Riesgo[] }>());
export const getRiesgosPorRRError = createAction('[Riesgo] Get Riesgos por RR error', props<{ payload: any  }>());
