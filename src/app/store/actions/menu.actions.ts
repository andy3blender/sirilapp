
import { createAction, props } from '@ngrx/store';
import { Menu } from 'src/app/models/menu';

export const getMenuByUser = createAction('[MENU] Get menu by user', props<{ login: string }>());
export const getMenuByUserSuccess = createAction('[MENU] Get menu by user success', props<{ menu: Menu[] }>());
export const getMenuByUserError = createAction('[MENU] Get menu by user error', props<{ payload: any }>());