import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Persona } from 'src/app/models/Persona';
import { Usuario } from 'src/app/models/usuario';
import * as actionsStore from 'src/app/store/actions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppStateWithPersona } from '../../../../store/reducers/persona.reducers';
import { Perfil } from 'src/app/models/Perfil';
import { AppStateWithPerfil } from '../../../../store/reducers/perfil.reducers';
import * as actionsUsuario from '../../../../store/actions/usuario.actions';
import { AppStateWithUsuario } from '../../../../store/reducers/usuario.reducers';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuarioFormGroup: FormGroup;
  isEditable = false;
  hidePass = true;
  personas: Persona;
  usuario: Usuario;
  tituloDialog: string;
  procesado: Boolean;

  empleados: Persona[];
  perfiles: Perfil[];

  constructor(private _formBuilder: FormBuilder,
              private _store: Store<AppStateWithPersona>,
              private _storePerfil: Store<AppStateWithPerfil>,
              private _storeUsuario: Store<AppStateWithUsuario>,
              private _dialogRef: MatDialogRef<CrearUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) private _dataToUpdate: any) { }

  ngOnInit(): void {

    this._store.dispatch(actionsStore.getPersonas());
    this._store.dispatch(actionsStore.getPerfiles());
    
    this._store.select('persona').subscribe(emp => {
      console.log(emp.personas);
      this.empleados = emp.personas;
    });

    this._storePerfil.select('perfil').subscribe(p => {
      console.log(p.perfiles);
      this.perfiles = p.perfiles;
    });
    
    if(this._dataToUpdate) {
      //console.log(this._dataToUpdate);
      this.tituloDialog = "Editar registro";
      this.usuarioFormGroup = this._formBuilder.group({
        usuarioId: [this._dataToUpdate.usuario.usuarioId], 
        empleadoId: [this._dataToUpdate.usuario.identificacion, Validators.required], 
        login: [this._dataToUpdate.usuario.login, Validators.required],
        clave: [this._dataToUpdate.usuario.clave, Validators.required],
        perfilId: [this._dataToUpdate.usuario.perfilId, Validators.required],
        activo: [this._dataToUpdate.usuario.activo, Validators.required]
      });
    }
    else {
      this.tituloDialog = "Nuevo registro";
      this.usuarioFormGroup = this._formBuilder.group({
        usuarioId: ['0'],
        empleadoId: ['', Validators.required], 
        login: ['', Validators.required],
        clave: ['', Validators.required],
        perfilId: ['', Validators.required],
        activo: [true]
      });
    }
  }

  guardaUsuario() {
    if(this._dataToUpdate) {
      this.usuario = {
        usuarioId: this.usuarioFormGroup.get('usuarioId').value,
        personaId: this.usuarioFormGroup.get('empleadoId').value, //  this.personaFormGroup.get('personaId').value,
        login: this.usuarioFormGroup.get('login').value,
        clave: this.usuarioFormGroup.get('clave').value,
        perfilId: this.usuarioFormGroup.get('perfilId').value,
        estado: 'V',
        activo: this.usuarioFormGroup.get('activo').value
      }
      console.log(this.usuario);
      this._store.dispatch(actionsUsuario.editUsuario({ usuario: this.usuario }));
    }
    else {      
      this.usuario = {
        //usuarioId: this.usuarioFormGroup.get('usuarioId').value,
        personaId: this.usuarioFormGroup.get('empleadoId').value, //  this.personaFormGroup.get('personaId').value,
        login: this.usuarioFormGroup.get('login').value,
        clave: this.usuarioFormGroup.get('clave').value,
        perfilId: this.usuarioFormGroup.get('perfilId').value,
        estado: 'V',
        activo: this.usuarioFormGroup.get('activo').value
      }
      this._store.dispatch(actionsUsuario.addUsuario({ usuario: this.usuario }));
    }

    this._storeUsuario.select('usuario').subscribe(usuario => {
      this.procesado = usuario.procesado;
      if(this.procesado){
        //console.log('Insertado, cerrar');
        this._dialogRef.close(true);
      }
    });

  }

}
