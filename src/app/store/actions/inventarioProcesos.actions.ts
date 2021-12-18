import { createAction, props } from '@ngrx/store';
import { InventarioProcesos } from '../../models/inventarioProcesos';

export const getInventario = createAction('[Inventario] Get inventario');
export const getInventarioSuccess = createAction('[Inventario] Get inventario success', props<{ inventario: InventarioProcesos[] }>());
export const getInventarioError = createAction('[Inventario] Get inventario error', props<{ payload: any  }>());

export const insertInventario = createAction('[Inventario] Insert inventario', props<{ proceso: InventarioProcesos }>());
export const insertInventarioSuccess = createAction('[Inventario] Insert inventario success', props<{ inventario: InventarioProcesos[] }>());
export const insertInventarioError = createAction('[Inventario] Insert inventario error', props<{ payload: any  }>());

export const editInventario = createAction('[Inventario] Edit Inventario', props<{ proceso: InventarioProcesos }>());
export const editInventarioSuccess = createAction('[Inventario] Edit Inventario success', props<{ proceso: InventarioProcesos }>());
export const editInventarioError = createAction('[Inventario] Edit Inventario error', props<{ payload: any  }>());

export const deleteInventario = createAction('[Inventario] Delete Inventario', props<{ procesoId: number }>());
export const deleteInventarioSuccess = createAction('[Inventario] Delete Inventario success');
export const deleteInventarioError = createAction('[Inventario] Delete Inventario error', props<{ payload: any }>());
