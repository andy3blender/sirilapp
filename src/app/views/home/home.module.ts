import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { homeRoutes } from './home.routes';

import { MatButtonModule } from '@angular/material/button';

const rutasHijas: Routes = [
  { path:'', 
    component: HomeComponent,
    children: homeRoutes
  },
]

@NgModule({
  declarations: [ ],
  imports: [
    RouterModule.forChild(rutasHijas)    
  ],
  exports: [
    RouterModule,
    MatButtonModule
  ]
})
export class HomeModule { }
