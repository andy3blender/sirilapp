import { createAction, props } from '@ngrx/store';
import { Permiso } from 'src/app/models/permiso';
import { permisoPerfil } from 'src/app/models/permisoPerfil';
import { Perfil } from '../../models/Perfil';

export const getPerfiles = createAction('[Perfil] Get perfil');
export const getPerfilesSuccess = createAction('[Perfil] Get perfil success', props<{ perfiles: Perfil[] }>());
export const getPerfilesError = createAction('[Perfil] Get perfil error', props<{ payload: any  }>());

// export const addPerfil = createAction('[Perfil] Add perfil', props<{ perfil: Perfil, permiso: Permiso }>());
export const addPerfil = createAction('[Perfil] Add perfil', props<{ perfil: Perfil, permiso: string[] }>());
export const addPerfilSuccess = createAction('[Perfil] Add perfil success', props<{ perfilId: number, permiso: string[] }>());
export const addPerfilError = createAction('[Perfil] Add perfil error', props<{ payload: any  }>());

export const editPerfil = createAction('[Perfil] Edit Perfil', props<{ perfil: Perfil, permiso: string[] }>());
export const editPerfilSuccess = createAction('[Perfil] Edit Perfil success', props<{ perfilId: number, permiso: string[] }>());
export const editPerfilError = createAction('[Perfil] Edit Perfil error', props<{ payload: any  }>());

export const deletePerfil = createAction('[Perfil] Delete Perfil', props<{ perfilId: number }>());
export const deletePerfilSuccess = createAction('[Perfil] Delete Perfil success');
export const deletePerfilError = createAction('[Perfil] Delete Perfil error', props<{ payload: any  }>());