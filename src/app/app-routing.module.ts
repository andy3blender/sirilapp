import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  // { path:'', redirectTo: 'login' },
  {
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () => import('./views/home/etapas/etapas.module').then( e => e.EtapasModule)
    //loadChildren: () => import('./views/home/home.module').then( e => e.HomeModule)
  },

  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
