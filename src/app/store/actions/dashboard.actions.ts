import { createAction, props } from '@ngrx/store';
import { Dashboard } from '../../models/dashboard';

export const getRiesgosFactor = createAction('[DashBoard] Get Riesgos Factor data', props<{ tipo: string  }>());
export const getRiesgosFactorSuccess = createAction('[DashBoard] Get Riesgos Factor data success', props<{ data: Dashboard[] }>());
export const getRiesgosFactorError = createAction('[DashBoard] Get Riesgos Factor data error', props<{ payload: any  }>());

export const getRiesgosFuente = createAction('[DashBoard] Get Riesgos Fuente data', props<{ tipo: string  }>());
export const getRiesgosFuenteSuccess = createAction('[DashBoard] Get Riesgos Fuente data success', props<{ data: Dashboard[] }>());
export const getRiesgosFuenteError = createAction('[DashBoard] Get Riesgos Fuente data error', props<{ payload: any  }>());

export const getRiesgosTipoEvento = createAction('[DashBoard] Get Riesgos TipoEvento data', props<{ tipo: string  }>());
export const getRiesgosTipoEventoSuccess = createAction('[DashBoard] Get Riesgos TipoEvento data success', props<{ data: Dashboard[] }>());
export const getRiesgosTipoEventoError = createAction('[DashBoard] Get Riesgos TipoEvento data error', props<{ payload: any  }>());

export const getRIpromedio = createAction('[DashBoard] Get RI promedio', props<{ tipo: string  }>());
export const getRIpromedioSuccess = createAction('[DashBoard] Get RI promedio success', props<{ data: Dashboard }>());
export const getRIpromedioError = createAction('[DashBoard] Get RI promedio error', props<{ payload: any  }>());

export const getRRpromedio = createAction('[DashBoard] Get RR promedio', props<{ tipo: string  }>());
export const getRRpromedioSuccess = createAction('[DashBoard] Get RR promedio success', props<{ data: Dashboard }>());
export const getRRpromedioError = createAction('[DashBoard] Get RR promedio error', props<{ payload: any  }>());