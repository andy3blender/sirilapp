import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcesosComponent } from './procesos/procesos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path:'procesos', component: ProcesosComponent },      
      { path: '**', redirectTo: 'procesos' },      
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
export class IdentificacionRoutingModule { }