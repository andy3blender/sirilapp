import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Persona } from 'src/app/models/Persona';
// import { AppSate } from '../../../../store/app.reducer';
import * as actionsPersona from '../../../../store/actions/persona.actions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppStateWithPersona } from '../../../../store/reducers/persona.reducers';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  personaFormGroup: FormGroup;
  persona: Persona;
  hidePass = true;
  inserted: Boolean;
  tituloDialog: string;

  constructor(private _formBuilder: FormBuilder,
              private store: Store<AppStateWithPersona>,
              private dialogRef: MatDialogRef<CrearEmpleadoComponent>,
              @Inject(MAT_DIALOG_DATA) private dataToUpdate: any
              ) { }

  ngOnInit(): void {

    if(this.dataToUpdate) {
      this.tituloDialog = "Editar registro";
      this.personaFormGroup = this._formBuilder.group({
        personaId: [{value: this.dataToUpdate.empleado.identificacion, disabled: true}, [Validators.required, Validators.maxLength(15)]],
        nombres: [this.dataToUpdate.empleado.nombres, [Validators.required]],
        apellidos: [this.dataToUpdate.empleado.apellidos, [Validators.required]],
        email: [this.dataToUpdate.empleado.email, [Validators.required, Validators.email]],
        fechaNac: [this.dataToUpdate.empleado.fechaNacimiento],      
      });
    }
    else {
      this.tituloDialog = "Nuevo registro";
      this.personaFormGroup = this._formBuilder.group({
        personaId: ['', [Validators.required, Validators.maxLength(15)]],
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        fechaNac: [null],      
      });
    }    
  }

  guardaPersona() {
    //console.log(this.empleado.nombre);
    this.persona = {
      identificacion:  this.personaFormGroup.get('personaId').value,
      nombres: this.personaFormGroup.get('nombres').value,
      apellidos: this.personaFormGroup.get('apellidos').value,
      email: this.personaFormGroup.get('email').value,
      fechaNacimiento: this.personaFormGroup.get('fechaNac').value != '' ? this.personaFormGroup.get('fechaNac').value : null,      
      estado: 'V',
      foto: null,
      //ultimaActualizacion: null,
    }

    //console.log(this.persona);

    if(this.dataToUpdate) {
      this.store.dispatch(actionsPersona.editPersona({ persona: this.persona }));
    }
    else {      
      this.store.dispatch(actionsPersona.addPersona({ persona: this.persona }));
    }

    this.store.select('persona').subscribe(person => {
      this.inserted = person.procesado;
      if(this.inserted){
        //console.log('Insertado, cerrar');
        this.dialogRef.close(true);
      }
    });

  }

}
