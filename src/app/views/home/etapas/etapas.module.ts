import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EtapasComponent } from './etapas.component';
import { SharedModule } from '../../../shared/shared.module';
import { HomeModule } from '../home.module';
import { HomeComponent } from '../home.component';
import { ChartModule, AccumulationChartModule  } from '@syncfusion/ej2-angular-charts';
import { CategoryService , LegendService, TooltipService, DataLabelService, ColumnSeriesService} from '@syncfusion/ej2-angular-charts';
import { PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService,
  AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
import { CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { StoreModule } from '@ngrx/store';
import { dashReducer } from '../../../store/reducers/dashboard.reducers';

@NgModule({
  declarations: [
    EtapasComponent,
    HomeComponent
  ],
  imports: [
    StoreModule.forFeature('dash', dashReducer),
    SharedModule,
    RouterModule,
    HomeModule,
    ChartModule,
    AccumulationChartModule,
    CircularGaugeModule,
    DashboardLayoutModule
  ],
  providers: [ CategoryService, LegendService, TooltipService, DataLabelService, ColumnSeriesService,
    PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,
    AccumulationAnnotationService, AnnotationsService]
})
export class EtapasModule { }
