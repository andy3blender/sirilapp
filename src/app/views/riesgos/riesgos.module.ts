import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiesgosRoutingModule } from './riesgos-routing.module';
import { CrearRiesgoComponent } from './inventario/crear-riesgo/crear-riesgo.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

//material
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule  } from '@angular/material/dialog';
import { catalogoReducer } from '../../store/reducers/catalogo.reducers';
import { CrearCatalogoComponent } from './catalogo/crear-catalogo/crear-catalogo.component';
import { InventarioComponent } from './inventario/inventario.component';
import { riesgoReducer } from '../../store/reducers/riesgo.reducers';

@NgModule({
  declarations: [
    CrearRiesgoComponent,
    CatalogoComponent,
    CrearCatalogoComponent,
    InventarioComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('catalogo', catalogoReducer),
    StoreModule.forFeature('riesgo', riesgoReducer),
    ReactiveFormsModule,
    RiesgosRoutingModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule, 
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ]
})
export class RiesgosModule { }
