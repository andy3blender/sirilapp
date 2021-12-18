import { Component, OnDestroy, OnInit } from '@angular/core';
//import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppSate } from 'src/app/store/app.reducer';
import { Usuario } from 'src/app/models/usuario';
import { browserReload } from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  usuarioActual: Usuario;
  breadCrumb: string;
  breadSubs: Subscription;


  constructor( private store: Store<AppSate>,
               private router: Router) { }

  ngOnInit(): void {
    console.log('Ingresa a OnInit de Home');
    this.breadSubs = this.store.select('ui').subscribe( ({ ruta }) => {
      if(ruta)
        this.breadCrumb = ruta;
      else {
        console.log(this.router.url);
        if(ruta === 'administracion/cuenta')
          this.breadCrumb = "Home » Mi cuenta";
        else
          this.breadCrumb = "Home » Etapas";

      }              
    });

    //REVISAR SI ESTE CODIGO VA AQUI PARA CUANDO RECARGA LA PAGINA
    // this.usuarioService.initUserListener();
    // this.usuarioActual = this.usuarioService.usuarioActual;
    
    // if(this.usuarioActual)
    //   this.store.dispatch(browserReload({usuario: this.usuarioActual}));
    
  }

  ngOnDestroy(): void {
    this.breadSubs.unsubscribe();
  }

}
