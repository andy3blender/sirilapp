import { createAction, props } from '@ngrx/store';
import { Mapas } from 'src/app/models/mapas';

export const getMapaRI = createAction('[Mapas] Get mapa inherente');
export const getMapaRISuccess = createAction('[Mapas] Get mapa inherente success', props<{ mapa: Mapas[] }>());
export const getMapaRIError = createAction('[Mapas] Get mapa inherente error', props<{ payload: any  }>());

export const getMapaRR = createAction('[Mapas] Get mapa residual');
export const getMapaRRSuccess = createAction('[Mapas] Get mapa residual success', props<{ mapa: Mapas[] }>());
export const getMapaRRError = createAction('[Mapas] Get mapa residual error', props<{ payload: any  }>());
