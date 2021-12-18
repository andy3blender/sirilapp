import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertService } from '@full-fledged/alerts';
import { tap } from "rxjs/operators";
import * as loginActions from '../actions/login.actions';
import * as personaActions from '../actions/persona.actions';
import * as usuarioActions from '../actions/usuario.actions';
import * as perfilActions from '../actions/perfil.actions';
import * as inventarioActions from '../actions/inventarioProcesos.actions';
import * as catalogoActions from '../actions/catalogo.actions';
import * as riesgoActions from '../actions/riesgo.actions';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';
import { Store } from "@ngrx/store";
import { AppSate } from "../app.reducer";

@Injectable()
export class AlertsEffects {
    constructor(
        private actions$: Actions,
        private alert: AlertService,
        private _snackBar: MatSnackBar,
        private store: Store<AppSate>
    ) {}

    unableToLogin$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.getLoginError ),
            tap( (e) => this.alert.danger(e.payload)) 
        ),
        {
            dispatch: false
        }
    );

    errorGetPersons$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.getPersonasError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    addPersonError$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.addPersonaError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    addPersonSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.addPersonaSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    updatePersonError$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.editPersonaError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    updatePersonSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.editPersonaSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro actualizado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    deletePersonError$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.deletePersonaError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    deletePersonSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( personaActions.deletePersonaSuccess ),
            tap( (e) => {
                this.store.dispatch( personaActions.getPersonas());
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro eliminado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    addUserError$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.addUsuarioError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    addUserSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.addUsuarioSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    updateUserError$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.editUsuarioError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    updateUserSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.editUsuarioSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    deleteUserError$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.deleteUsuarioError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    deleteUserSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.deleteUsuarioSuccess ),
            tap( (e) => {
                this.store.dispatch( usuarioActions.getUsuarios());
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro eliminado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    updatePasswordSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.updatePasswordSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    updatePasswordError$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.updatePasswordError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    updateFotoSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.updateFotoPerfilSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Foto actualizada correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    updateFotoError$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.updateFotoPerfilError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    addPerfilError$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.addPerfilError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    addPerfilSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.addPerfilSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    updatePerfilError$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.editPerfilError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent, {
                    //duration: 6000,
                    data: { 
                        message: `ERROR ACTUALIZANDO PERFIL: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top',

                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    updatePerfilSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.editPerfilSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    deletePerfilError$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.deletePerfilError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    deletePerfilSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( perfilActions.deletePerfilSuccess ),
            tap( (e) => {
                this.store.dispatch( perfilActions.getPerfiles());
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro eliminado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    getInventarioError$ = createEffect(
        () => this.actions$.pipe(
            ofType( inventarioActions.getInventarioError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    addCatalogoSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( catalogoActions.addCatalogoSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    addCatalogoError$ = createEffect(
        () => this.actions$.pipe(
            ofType( catalogoActions.addCatalogoError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    editCatalogoSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( catalogoActions.editCatalogoSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    editCatalogoError$ = createEffect(
        () => this.actions$.pipe(
            ofType( catalogoActions.editCatalogoError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    deleteCatalogoSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( catalogoActions.deleteCatalogoSuccess ),
            tap( ({grupoId}) => {
                this.store.dispatch( catalogoActions.getCatalogo({ grupoId }));
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro eliminado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    deleteCatalogoError$ = createEffect(
        () => this.actions$.pipe(
            ofType( catalogoActions.deleteCatalogoError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    addRiesgoSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.addRiesgoSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    addRiesgoError$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.addRiesgoError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    editRiesgoSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.editRiesgoSuccess ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro guardado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    editRiesgoError$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.editRiesgoError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    deleteRiesgoSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.deleteRiesgoSuccess ),
            tap( () => {
                this.store.dispatch( riesgoActions.getRiesgos());
                this._snackBar.openFromComponent(NotificationsComponent , {
                    duration: 4000,
                    data: { 
                        message: `Registro eliminado correctamente`,
                        icon: 'thumb_up', //thumb_up, error, info
                    },
                    panelClass: ["success"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );

    deleteRiesgoError$ = createEffect(
        () => this.actions$.pipe(
            ofType( riesgoActions.deleteRiesgoError ),
            tap( (e) => {
                this._snackBar.openFromComponent(NotificationsComponent , {
                    //duration: 6000,
                    data: { 
                        message: `ERROR: ${e.payload}`,
                        icon: 'error', //thumb_up, error, info
                    },
                    panelClass: ["error"], //success, error, info
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });               
            }) 
        ),
        {
            dispatch: false
        }
    );


}