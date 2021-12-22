import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/store/actions';
import { AppSate } from '../../store/app.reducer';
import { personaUsuario } from '../../models/personaUsuario';
import * as globals from '../../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioActual: personaUsuario;
  nombreActual: string;
  arrayNombres: string[];
  fotoUrlServer: string = globals.serverUrl;
  fotoClient: string
  

  constructor( private store: Store<AppSate>) { }

  ngOnInit(): void {
    this.store.select('login').subscribe(us => {
      this.fotoClient = "";
      this.usuarioActual = us.user;

      if(this.usuarioActual.fotoUrl)
        this.fotoClient = this.fotoUrlServer+''+this.usuarioActual.fotoUrl;
      else
        this.fotoClient = this.fotoUrlServer+'/Resources/Images/default.png';

      this.arrayNombres = this.usuarioActual.nombres.split(' ');
      if(this.arrayNombres.length > 0)
        this.nombreActual = this.arrayNombres[0];
      else
        this.nombreActual = this.usuarioActual.nombres;

    });
    //this.usuarioActual = this.authService.usuarioActual;

  }

  logout() {
    this.store.dispatch( Logout() );
  }

}
