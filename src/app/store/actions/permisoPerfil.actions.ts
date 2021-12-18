import { createAction, props } from '@ngrx/store';
import { permisoPerfil } from '../../models/permisoPerfil';

export const getPermisoPerfil = createAction('[PerfilPermiso] Get perfil permiso', props<{ perfilId: number }>());
export const getPermisoPerfilSuccess = createAction('[PerfilPermiso] Get perfil permiso success', props<{ permisos: permisoPerfil[] }>());
export const getPermisoPerfilError = createAction('[PerfilPermiso] Get perfil permiso error', props<{ payload: any  }>());

// export const addPerfil = createAction('[Perfil] Add perfil', props<{ perfil: Perfil }>());
// export const addPerfilSuccess = createAction('[Perfil] Add perfil success');
// export const addPerfilError = createAction('[Perfil] Add perfil error', props<{ payload: any  }>());

// export const editPerfil = createAction('[Perfil] Edit Perfil', props<{ perfil: Perfil }>());
// export const editPerfilSuccess = createAction('[Perfil] Edit Perfil success', props<{ perfil: Perfil }>());
// export const editPerfilError = createAction('[Perfil] Edit Perfil error', props<{ payload: any  }>());

// export const deletePerfil = createAction('[Perfil] Delete Perfil', props<{ perfilId: number }>());
// export const deletePerfilSuccess = createAction('[Perfil] Delete Perfil success');
// export const deletePerfilError = createAction('[Perfil] Delete Perfil error', props<{ payload: any  }>());