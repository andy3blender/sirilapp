import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

//syncfusion
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { ToolbarService, FilterService,EditService } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { IdentificacionRoutingModule } from './identificacion-routing.module';
import { ProcesosComponent } from './procesos/procesos.component';
import { inventarioReducer } from '../../store/reducers/inventarioProcesos.reducers';


@NgModule({
  declarations: [
    ProcesosComponent,
  ],
  providers: [
    ToolbarService,
    FilterService,
    EditService
  ],
  imports: [
    CommonModule,
    IdentificacionRoutingModule,    
    StoreModule.forFeature('inventario', inventarioReducer),
    TreeGridModule,
    DropDownListModule    
  ]
})
export class IdentificacionModule { }
