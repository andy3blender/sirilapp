import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateWithPersona } from '../../../store/reducers/persona.reducers';
import { Persona } from 'src/app/models/Persona';
import { Subscription } from 'rxjs';
import * as actionsPersona from '../../../store/actions/persona.actions';
import { MatchPassword } from 'src/app/directives/custom.validator';
import { personaUsuario } from 'src/app/models/personaUsuario';
import * as actionsUsuario from '../../../store/actions/usuario.actions';
import { updateFotoPerfil } from 'src/app/store/actions';
import * as globals from '../../../globals';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit, OnDestroy {

  personaFormGroup: FormGroup;
  passFormGroup: FormGroup;
  persona: personaUsuario;
  personaEdited: Persona;
  hidePass = true;
  hideConfirmPass = true;
  personaSub: Subscription;
  fotoUrlServer: string = globals.serverUrl;
  fotoClient: string
  tituloBoton: string = 'Seleccionar archivo';
  
  selectedFile: File;
  // selectedFile: ImageSnippet;

  constructor(private _formBuilder: FormBuilder,
              private store: Store<AppStateWithPersona>) { }

  ngOnDestroy() {
    this.personaSub.unsubscribe();
  }

  ngOnInit(): void {

    this.personaSub = this.store.select('login').subscribe( p => {
      this.fotoClient = "";

      this.persona = p.user;

      if(this.persona.fotoUrl)
        this.fotoClient = this.fotoUrlServer+''+this.persona.fotoUrl;
      else
        this.fotoClient = this.fotoUrlServer+'Resources/Images/default.png';


      this.personaFormGroup = this._formBuilder.group({
        personaId: [this.persona.identificacion, [Validators.required, Validators.maxLength(15)]],
        nombres: [this.persona.nombres, [Validators.required]],
        apellidos: [this.persona.apellidos, [Validators.required]],
        email: [this.persona.email, [Validators.required, Validators.email]],
        fechaNac: [this.persona.fechaNacimiento]
      });

    });

    this.passFormGroup = this._formBuilder.group({
      nuevoPass: ['', [Validators.required]],
      confirmaPass: ['', [Validators.required]]
    },
    { validator: MatchPassword('nuevoPass', 'confirmaPass') }
    );
    
  }

  guardaPersona() {
    this.personaEdited = {
      identificacion:  this.personaFormGroup.get('personaId').value,
      nombres: this.personaFormGroup.get('nombres').value,
      apellidos: this.personaFormGroup.get('apellidos').value,
      email: this.personaFormGroup.get('email').value,
      fechaNacimiento: this.personaFormGroup.get('fechaNac').value != '' ? this.personaFormGroup.get('fechaNac').value : null,      
      estado: 'V',
      //foto: this.persona.foto      
    }

    this.store.dispatch(actionsPersona.editPersona({ persona: this.personaEdited }));

  }

  updatePassword() {
    this.store.dispatch(actionsUsuario.updatePassword({ usuarioId: this.persona.usuarioId, nuevoPass:this.passFormGroup.get('confirmaPass').value}));
  }

  processFile(imageInput: any) {
   this.selectedFile = imageInput.files[0]
   this.tituloBoton = this.selectedFile.name;
  }

  onUpload() {
    const uploadData = new FormData();
    
    if(this.selectedFile) {
      uploadData.append('file', this.selectedFile, this.selectedFile.name );  
      this.store.dispatch( updateFotoPerfil({ personaId: this.persona.identificacion, foto: uploadData}) );
      this.tituloBoton = 'Seleccionar archivo';
    }
  }

}
