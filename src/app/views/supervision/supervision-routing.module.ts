import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { MapaRIComponent } from './mapaRI/mapaRI.component';
import { MapasComponent } from './mapas/mapas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path:'mapas', component: MapasComponent},
      { path: '**', redirectTo: 'mapas' },
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
export class SupervisionRoutingModule { }