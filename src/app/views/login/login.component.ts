import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario';
import { AppSate } from '../../store/app.reducer';
import { getLogin } from '../../store/actions/login.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { personaUsuario } from '../../models/personaUsuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  loginForm: FormGroup;
  recuperaForm: FormGroup;
  txtUsuario: string;
  txtClave: string;
  txtUsuarioRecupera: string;
  dataUsuario: personaUsuario;
  
  constructor(private store: Store<AppSate>,
              private fb: FormBuilder,
              private _authService: AuthService
    ) { }

  ngOnInit(): void {
    this.loginForm =  this.fb.group(
      {
        userName: ['', [Validators.required]],
        clave: ['', [Validators.required]]
      }
    )

    this.recuperaForm =  this.fb.group(
      {
        recuperaUserName: ['', [Validators.required]]
      }
    )
  }

  checkLogin() {

    this.txtUsuario = this.loginForm.get('userName').value;
    this.txtClave = this.loginForm.get('clave').value;

    this.store.dispatch( getLogin({ login: this.txtUsuario, password: this.txtClave }) );
    
  }

  async recuperarPass() {
    this.txtUsuarioRecupera = this.recuperaForm.get('recuperaUserName').value;
    this._authService.getUserData(this.txtUsuarioRecupera).subscribe( u => {
      console.log(u);
      this.dataUsuario = u;
    });

    // if(this.dataUsuario){ 
    //   await transporter.sendMail({
    //     from: '"SiRiLApp" <avargasman@uoc.edu>', // sender address
    //     to: this.dataUsuario.email, // list of receivers
    //     subject: "Recuperar Password", // Subject line
    //     text: `Su password es: ${this.dataUsuario.clave}`, // plain text body
    //     //html: "<b>Hello world?</b>", // html body
    //   });
    // }
  }

}
