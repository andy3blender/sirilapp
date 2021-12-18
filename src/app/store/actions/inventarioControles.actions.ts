import { createAction, props } from '@ngrx/store';
import { InventarioControles } from '../../models/inventarioControles';

export const getControles = createAction('[Controles] Get inventario');
export const getControlesSuccess = createAction('[Controles] Get inventario success', props<{ inventario: InventarioControles[] }>());
export const getControlesError = createAction('[Controles] Get inventario error', props<{ payload: any  }>());

export const insertControl = createAction('[Controles] Insert inventario', props<{ control: InventarioControles }>());
export const insertControlSuccess = createAction('[Controles] Insert inventario success', props<{ inventario: InventarioControles[] }>());
export const insertControlError = createAction('[Controles] Insert inventario error', props<{ payload: any  }>());

export const editControl = createAction('[Controles] Edit Inventario', props<{ control: InventarioControles }>());
export const editControlSuccess = createAction('[Controles] Edit Inventario success', props<{ control: InventarioControles }>());
export const editControlError = createAction('[Controles] Edit Inventario error', props<{ payload: any  }>());

export const deleteControl = createAction('[Controles] Delete Inventario', props<{ controlId: number }>());
export const deleteControlSuccess = createAction('[Controles] Delete Inventario success');
export const deleteControlError = createAction('[Controles] Delete Inventario error', props<{ payload: any }>());
