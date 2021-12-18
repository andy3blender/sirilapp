import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ICellEventArgs, HeatMap, ITooltipEventArgs, ICellClickEventArgs } from '@syncfusion/ej2-heatmap';
import { AppStateWithMapa } from '../../../store/reducers/mapa.reducers';
import { Store } from '@ngrx/store';
import * as actions from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { EscalaColorService } from '../../../services/escalaColor.service';
import { EscalaColor } from '../../../models/escalaColor';
import { CatalogoService } from '../../../services/catalogo.service';
import { CatalogoGeneral } from 'src/app/models/catalogoGeneral';
import { MatDialog } from '@angular/material/dialog';
import { DetalleRiesgosComponent } from '../detalle-riesgos/detalle-riesgos.component';

@Component({
  selector: 'app-mapa-rr',
  templateUrl: './mapa-rr.component.html',
  styleUrls: ['./mapa-rr.component.css']
})
export class MapaRRComponent implements OnInit, OnDestroy {

  mapaRRSubs: Subscription;
  dataSourceRR: Object[];
  escalaColor: EscalaColor[];
  paletaMapa: Object[]=[];
  paletteSettingsRR: Object;
  xAxisRR: Object;
  yAxisRR: Object;
  valoresFrecuencia: CatalogoGeneral[];
  valoresImpacto: CatalogoGeneral[];

  constructor(private _store: Store<AppStateWithMapa>,
              private _escalaService: EscalaColorService,
              private _catalogoService: CatalogoService,
              private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargaEscalaColor();
    this.cargaFI();
    this.cargaMapaRR();
  }

  ngOnDestroy(): void {
    if(this.mapaRRSubs)
      this.mapaRRSubs.unsubscribe();
  }

  titleSettingsRR: Object = {
    text: 'Mapa de Riesgo Residual',
    textStyle: {
        size: '15px',
        fontWeight: '500',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    }
  };

  dataSourceSettingsRR: Object = {
      isJsonData: true,
      adaptorType: 'Cell',
      xDataMapping: 'frecuencia',
      yDataMapping: 'impacto',
      valueMapping: 'riesgo'
  };

  cellSettingsRR: Object = {
    border: {
        radius: 4,
        width: 1,
        color: 'white'
    },
    showLabel: true,
  };

  legendSettingsRR: Object = {
    position: 'Bottom',
    // width: '400px',
    // enableSmartLegend: true
  };

  cargaMapaRR() {
    this._store.dispatch( actions.getMapaRR());
    this.mapaRRSubs = this._store.select('mapa').subscribe( p => {
      this.dataSourceRR = p.mapaRR;      
    });
  }

  cargaEscalaColor() {
    this._escalaService.getEscalaColores().subscribe(e => {
      this.escalaColor = e;
      this.escalaColor.forEach( (el) => {
        this.paletaMapa.push({
          minColor: el.colorCell, maxColor: el.colorCell, label: el.descripcion, startValue: el.valorInicial, endValue:el.valorFinal
        })
      });   
      this.paletteSettingsRR = {       
        palette: this.paletaMapa,
        type: "Gradient"
      };      
    });
  }

  cargaFI() {
    let frCodigo=[];
    let frValor: Object[]=[];

    let imCodigo=[];
    let imValor: Object[]=[];

    this._catalogoService.getCatalogoItems(6).subscribe(c => {
      this.valoresFrecuencia = c;

      this.valoresFrecuencia.forEach( (el) => {
        frCodigo.push(parseInt(el.codigo));
        frValor.push({
          start: parseInt(el.codigo)-1, end: parseInt(el.codigo)-1, text: el.valor
        })

      });
      
      this.xAxisRR = {
        labels: frCodigo, 
        multiLevelLabels: [{
          categories: frValor
        }],
        title: {text:'FRECUENCIA'}
      };
    });

    this._catalogoService.getCatalogoItems(7).subscribe(c => {
      this.valoresImpacto = c

      this.valoresImpacto.forEach( (el) => {
        imCodigo.push(parseInt(el.codigo));
        imValor.push({
          start: parseInt(el.codigo)-1, end: parseInt(el.codigo)-1, text: el.valor
        })

      });

      this.yAxisRR = {
        labels: imCodigo, 
        multiLevelLabels: [{
          categories: imValor
        }],
        title: {text:'IMPACTO'}
      };

    });
  }

  cellRenderRR(args: ICellEventArgs) {
    let dt2: any = args.heatmap.dataSource;
    let dtcell = dt2?.find(el => el.frecuencia == parseInt(args.xLabel) && el.impacto == parseInt(args.yLabel));

    if(dtcell?.totalRiesgos > 0)
      args.displayText = dtcell?.totalRiesgos.toString();
    else
      args.displayText = '';    
  }

  tooltipRenderRR(args: ITooltipEventArgs) {
    let dtIndividual: any = args.heatmap.dataSource;
    let dtool = dtIndividual?.find(el => el.frecuencia == parseInt(args.xLabel) && el.impacto == parseInt(args.yLabel));

    args.content = ['Riesgo residual: '+ args.value + ' | Total riesgos: '+ dtool?.totalRiesgos.toString()];
  }

  cellClickedRR(args: ICellClickEventArgs) {
    const dialogInstance = this._dialog.open(DetalleRiesgosComponent
      , {
        width: "80%",
        disableClose: false,
        data: { frecuencia: args.xLabel,
                impacto: args.yLabel,
                tipo: 'R' 
              }
      }
      
      );    
  }

}
