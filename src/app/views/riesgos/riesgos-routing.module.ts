import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { InventarioComponent } from './inventario/inventario.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path:'inventario', component: InventarioComponent },
      { path:'catalogoRiesgo', component: CatalogoComponent },
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
export class RiesgosRoutingModule { }