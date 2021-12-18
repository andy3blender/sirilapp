import { createAction, props } from '@ngrx/store';
import { CatalogoGeneral } from 'src/app/models/catalogoGeneral';

export const getCatalogo = createAction('[Catalogo] Get catalogo', props<{ grupoId: number  }>());
export const getCatalogoSuccess = createAction('[Catalogo] Get Catalogo success', props<{ catalogos: CatalogoGeneral[] }>());
export const getCatalogoError = createAction('[Catalogo] Get Catalogo error', props<{ payload: any  }>());

export const addCatalogo = createAction('[Catalogo] Add Catalogo', props<{ catalogo: CatalogoGeneral }>());
export const addCatalogoSuccess = createAction('[Catalogo] Add Catalogo success', props<{ catalogo: CatalogoGeneral }>());
export const addCatalogoError = createAction('[Catalogo] Add Catalogo error', props<{ payload: any  }>());

export const editCatalogo = createAction('[Catalogo] Edit Catalogo', props<{ catalogo: CatalogoGeneral }>());
export const editCatalogoSuccess = createAction('[Catalogo] Edit Catalogo success', props<{ catalogo: CatalogoGeneral }>());
export const editCatalogoError = createAction('[Catalogo] Edit Catalogo error', props<{ payload: any  }>());

export const deleteCatalogo = createAction('[Catalogo] Delete Catalogo', props<{ catalogoId: number }>());
export const deleteCatalogoSuccess = createAction('[Catalogo] Delete Catalogo success', props<{ grupoId: number }>());
export const deleteCatalogoError = createAction('[Catalogo] Delete Catalogo error', props<{ payload: any  }>());