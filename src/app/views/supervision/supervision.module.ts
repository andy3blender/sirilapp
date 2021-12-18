import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasComponent } from './mapas/mapas.component';
import { MapaRIComponent } from './mapaRI/mapaRI.component';
import { SupervisionRoutingModule } from './supervision-routing.module';

//syncfusion
import { HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { LegendService, TooltipService, AdaptorService } from '@syncfusion/ej2-angular-heatmap';

import { StoreModule } from '@ngrx/store';
import { mapaReducer } from '../../store/reducers/mapa.reducers';
import { DetalleRiesgosComponent } from './detalle-riesgos/detalle-riesgos.component';

import { MatDialogModule  } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { riesgoReducer } from '../../store/reducers/riesgo.reducers';
import { MapaRRComponent } from './mapa-rr/mapa-rr.component';

@NgModule({
  declarations: [
    MapaRIComponent,
    MapasComponent,
    DetalleRiesgosComponent,
    MapaRRComponent
  ],
  imports: [
    CommonModule,
    SupervisionRoutingModule,
    HeatMapModule,
    StoreModule.forFeature('mapa', mapaReducer),
    StoreModule.forFeature('riesgo', riesgoReducer),
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    LegendService, 
    TooltipService,
    AdaptorService
  ]
})
export class SupervisionModule { }
