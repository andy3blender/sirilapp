import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { VinculacionComponent } from './vinculacion/vinculacion.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path:'inventario', component: InventarioComponent },
      { path:'parametros', component: ParametrosComponent },
      { path:'vinculacion', component: VinculacionComponent },
      { path: '**', redirectTo: 'inventario' },
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
export class ControlesRoutingModule { }