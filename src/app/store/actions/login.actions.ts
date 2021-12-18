import { createAction, props } from '@ngrx/store';
import { personaUsuario } from '../../models/personaUsuario';

export const getLogin = createAction('[LOGIN] Validate login', props<{ login: string, password: string }>());
export const getLoginSuccess = createAction('[LOGIN] Login success', props<{ usuario: personaUsuario }>());
export const getLoginError = createAction('[LOGIN] Login error', props<{ payload: any }>());

export const Logout = createAction('[LOGOUT] Logout');
export const LogoutSuccess = createAction('[LOGOUT] Logout success');

export const browserReload = createAction('[CORE] Browser reload', props<{ usuario: personaUsuario }>());

export const updateFotoPerfil = createAction('[CUENTA] Update Foto', props<{ personaId: string, foto: FormData }>());
export const updateFotoPerfilSuccess = createAction('[CUENTA] Update Foto success', props<{ usuario: personaUsuario }>());
export const updateFotoPerfilError = createAction('[CUENTA] Update Foto error', props<{ payload: any }>());


