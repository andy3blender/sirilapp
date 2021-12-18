import { Routes } from "@angular/router";
import { EtapasComponent } from './etapas/etapas.component';
import { AuthGuard } from '../../services/auth.guard';

export const homeRoutes: Routes = [
    { path: '', component: EtapasComponent},
    { path:'etapas', component: EtapasComponent },
    { 
        path: 'administracion',
        canLoad: [AuthGuard],
        loadChildren: () => import('../administracion/administracion.module').then( e => e.AdministracionModule)
    },
    { 
        path: 'identificacion',
        canLoad: [AuthGuard],
        loadChildren: () => import('../identificacion/identificacion.module').then( e => e.IdentificacionModule)
    },
    { 
        path: 'riesgos',
        canLoad: [AuthGuard],
        loadChildren: () => import('../riesgos/riesgos.module').then( e => e.RiesgosModule)
    },
    { 
        path: 'controles',
        canLoad: [AuthGuard],
        loadChildren: () => import('../controles/controles.module').then( e => e.ControlesModule)
    },
    { 
        path: 'supervision',
        canLoad: [AuthGuard],
        loadChildren: () => import('../supervision/supervision.module').then( e => e.SupervisionModule)
    }
]