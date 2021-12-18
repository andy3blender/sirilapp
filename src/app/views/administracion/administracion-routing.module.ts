import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CuentaComponent } from './cuenta/cuenta.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path:'empleado', component: EmpleadoComponent },
      { path:'usuario', component: UsuarioComponent },
      { path:'perfil', component: PerfilComponent },
      { path:'cuenta', component: CuentaComponent },
      { path: '**', redirectTo: 'empleado' },      
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AdministracionRoutingModule { }