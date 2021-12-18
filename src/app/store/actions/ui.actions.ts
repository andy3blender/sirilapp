import { createAction, props } from '@ngrx/store';

// export const isLoading = createAction('[UI] Is Loading');
// export const stopLoading = createAction('[UI] Stop Loading');

export const getBreadcrumb = createAction('[UI] Get breadcrumb', props<{ modulo: string, item: string }>());
export const setBreadcrumb = createAction('[UI] Set breadcrumb', props<{ ruta: string }>());
export const setBreadcrumbError = createAction('[UI] Set breadcrumb error', props<{ payload: any  }>());