import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario';
import { personaUsuario } from '../../models/personaUsuario';

export const getUsuarios = createAction('[Usuarios] Get usuarios');
export const getUsuariosSuccess = createAction('[Usuarios] Get usuarios success', props<{ usuarios: personaUsuario[] }>());
export const getUsuariosError = createAction('[Usuarios] Get usuarios error', props<{ payload: any  }>());

export const addUsuario = createAction('[Usuario] Add Usuario', props<{ usuario: Usuario }>());
export const addUsuarioSuccess = createAction('[Usuario] Add Usuario success', props<{ usuario: Usuario }>());
export const addUsuarioError = createAction('[Usuario] Add Usuario error', props<{ payload: any  }>());

export const editUsuario = createAction('[Usuario] Edit Usuario', props<{ usuario: Usuario }>());
export const editUsuarioSuccess = createAction('[Usuario] Edit Usuario success', props<{ usuario: Usuario }>());
export const editUsuarioError = createAction('[Usuario] Edit Usuario error', props<{ payload: any  }>());

export const deleteUsuario = createAction('[Usuario] Delete Usuario', props<{ usuarioId: number }>());
export const deleteUsuarioSuccess = createAction('[Usuario] Delete Usuario success');
export const deleteUsuarioError = createAction('[Usuario] Delete Usuario error', props<{ payload: any  }>());

export const updatePassword = createAction('[Usuario] Update Password', props<{ usuarioId: number, nuevoPass: string }>());
export const updatePasswordSuccess = createAction('[Usuario] Update Password success');
export const updatePasswordError = createAction('[Usuario] Update Password error', props<{ payload: any  }>());
