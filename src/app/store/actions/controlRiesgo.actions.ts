import { createAction, props } from '@ngrx/store';
import { ControlRiesgo } from '../../models/controlRiesgo';
import { ControlesVinculados } from '../../models/controlesVinculados';

//esto creo q no va desde el riesgollmara a el metodo que hace conteo de controles
export const getControlesVinculados = createAction('[ControlRiesgo] Get Controles vinculados');
export const getControlesVinculadosSuccess = createAction('[ControlRiesgo] Get Controles vinculados success', props<{ controles: ControlesVinculados[] }>());
export const getControlesVinculadosError = createAction('[ControlRiesgo] Get Controles vinculados error', props<{ payload: any  }>());
//esto creo q no va desde el riesgollmara a el metodo que hace conteo de controles

export const getControlRiesgo = createAction('[ControlRiesgo] Get ControlRiesgo', props<{ riesgoId: number  }>());
export const getControlRiesgoSuccess = createAction('[ControlRiesgo] Get ControlRiesgo success', props<{ controles: ControlRiesgo[] }>());
export const getControlRiesgoError = createAction('[ControlRiesgo] Get ControlRiesgo error', props<{ payload: any  }>());

export const addControlRiesgo = createAction('[ControlRiesgo] Add ControlRiesgo', props<{ control: ControlRiesgo }>());
export const addControlRiesgoSuccess = createAction('[ControlRiesgo] Add ControlRiesgo success', props<{ control: ControlRiesgo }>());
export const addControlRiesgoError = createAction('[ControlRiesgo] Add ControlRiesgo error', props<{ payload: any  }>());

export const editControlRiesgo = createAction('[ControlRiesgo] Edit ControlRiesgo', props<{ control: ControlRiesgo }>());
export const editControlRiesgoSuccess = createAction('[ControlRiesgo] Edit ControlRiesgo success', props<{ control: ControlRiesgo }>());
export const editControlRiesgoError = createAction('[ControlRiesgo] Edit ControlRiesgo error', props<{ payload: any  }>());

export const deleteControlRiesgo = createAction('[ControlRiesgo] Delete ControlRiesgo', props<{ controlId: number }>());
export const deleteControlRiesgoSuccess = createAction('[ControlRiesgo] Delete ControlRiesgo success', props<{ riesgoId: number }>());
export const deleteControlRiesgoError = createAction('[ControlRiesgo] Delete ControlRiesgo error', props<{ payload: any  }>());

export const deleteControlesVinculados = createAction('[ControlRiesgo] Delete Controles vincuados', props<{ riesgoId: number }>());
export const deleteControlesVinculadosSuccess = createAction('[ControlRiesgo] Delete Controles vinculados success');
export const deleteControlesVinculadosError = createAction('[ControlRiesgo] Delete Controles vinculados error', props<{ payload: any  }>());

export const calculoResidual = createAction('[ControlRiesgo] Get calculo residual', props<{ control: ControlRiesgo }>());
export const calculoResidualSuccess = createAction('[ControlRiesgo] Get calculo residual success', props<{ control: ControlRiesgo }>());
export const calculoResidualError = createAction('[ControlRiesgo] Get calculo residual error', props<{ payload: any  }>());