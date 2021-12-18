import { createAction, props } from '@ngrx/store';
import { Permiso } from 'src/app/models/permiso';
import { Perfil } from '../../models/Perfil';

export const addPermisos = createAction('[Permiso] Add permiso', props<{ perfilId: number, permiso: string[] }>());
export const addPermisosSuccess = createAction('[Permiso] Add permiso success');
export const addPermisosError = createAction('[Permiso] Add permiso error', props<{ payload: any  }>());

export const editPermisos = createAction('[Permiso] Edit permiso', props<{ perfilId: number, permiso: string[] }>());
export const editPermisosSuccess = createAction('[Permiso] Edit permiso success');
export const editPermisosError = createAction('[Permiso] Edit permiso error', props<{ payload: any  }>());