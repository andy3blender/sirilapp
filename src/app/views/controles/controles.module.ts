import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlesRoutingModule } from './controles-routing.module';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

import { InventarioComponent } from './inventario/inventario.component';
import { ParametrosComponent } from './parametros/parametros.component';

//material
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule  } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';

//syncfusion
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ToolbarService } from '@syncfusion/ej2-angular-grids';

import { catalogoReducer } from '../../store/reducers/catalogo.reducers';
import { controlesReducer } from '../../store/reducers/inventarioControles.reducers';
import { controlRiesgoReducer } from '../../store/reducers/controlRiesgo.reducers';

import { EditaVariableComponent } from './parametros/edita-variable/edita-variable.component';
import { EditaFactorComponent } from './parametros/edita-factor/edita-factor.component';
import { CrearControlComponent } from './inventario/crear-control/crear-control.component';
import { VinculacionComponent } from './vinculacion/vinculacion.component';
import { CrearVinculacionComponent } from './vinculacion/crear-vinculacion/crear-vinculacion.component';
import { CheckListControlesComponent } from './vinculacion/check-list-controles/check-list-controles.component';
import { riesgoReducer } from '../../store/reducers/riesgo.reducers';

@NgModule({
  declarations: [
    InventarioComponent,
    ParametrosComponent,
    EditaVariableComponent,
    EditaFactorComponent,
    CrearControlComponent,
    VinculacionComponent,
    CrearVinculacionComponent,
    CheckListControlesComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('catalogo', catalogoReducer),
    StoreModule.forFeature('control', controlesReducer),
    StoreModule.forFeature('controlRiesgo', controlRiesgoReducer),
    StoreModule.forFeature('riesgo', riesgoReducer),
    ControlesRoutingModule,
    ReactiveFormsModule,
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
    MatDialogModule,
    MatStepperModule,
    MatCardModule,
    GridModule
  ],
  providers: [ToolbarService]
})
export class ControlesModule { }
