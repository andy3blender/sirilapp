import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'app-mapaRI',
  templateUrl: './mapaRI.component.html',
  styleUrls: ['./mapaRI.component.css']
})
export class MapaRIComponent implements OnInit, OnDestroy {

  mapaRISubs: Subscription;
  dataSource: Object[];
  escalaColor: EscalaColor[];
  paletaMapa: Object[]=[];
  paletteSettings: Object;
  xAxis: Object;
  yAxis: Object;
  valoresFrecuencia: CatalogoGeneral[];
  valoresImpacto: CatalogoGeneral[];

  constructor(private _store: Store<AppStateWithMapa>,
              private _escalaService: EscalaColorService,
              private _catalogoService: CatalogoService,
              private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargaEscalaColor();
    this.cargaFI();
    this.cargaMapaRI();
  }

  ngOnDestroy(): void {
    if(this.mapaRISubs)
      this.mapaRISubs.unsubscribe();
  }

  titleSettings: Object = {
    text: 'Mapa de Riesgo Inherente',
    textStyle: {
        size: '15px',
        fontWeight: '500',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    }
  };

  dataSourceSettings: Object = {
      isJsonData: true,
      adaptorType: 'Cell',
      xDataMapping: 'frecuencia',
      yDataMapping: 'impacto',
      valueMapping: 'riesgo'
  };

  cellSettings: Object = {
    border: {
        radius: 4,
        width: 1,
        color: 'white'
    },
    showLabel: true,
  };

  legendSettings: Object = {
    position: 'Bottom',
    // width: '400px',
    // enableSmartLegend: true
  };

  cargaMapaRI() {
    this._store.dispatch( actions.getMapaRI());
    this.mapaRISubs = this._store.select('mapa').subscribe( p => {
      this.dataSource = p.mapa;      
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
      this.paletteSettings = {       
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
      // console.log(frCodigo);
      // console.log(frValor);

      this.xAxis = {
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

      this.yAxis = {
        labels: imCodigo, 
        multiLevelLabels: [{
          categories: imValor
        }],
        title: {text:'IMPACTO'}
      };

    });
  }

  cellRender(args: ICellEventArgs) {
    let dt2: any = args.heatmap.dataSource;
    let dtcell = dt2?.find(el => el.frecuencia == parseInt(args.xLabel) && el.impacto == parseInt(args.yLabel));

    if(dtcell?.totalRiesgos > 0)
      args.displayText = dtcell?.totalRiesgos.toString();
    else
      args.displayText = '';    
  }

  tooltipRender(args: ITooltipEventArgs) {
    let dtIndividual: any = args.heatmap.dataSource;
    let dtool = dtIndividual?.find(el => el.frecuencia == parseInt(args.xLabel) && el.impacto == parseInt(args.yLabel));

    args.content = ['Riesgo inherente: '+ args.value + ' | Total riesgos: '+ dtool?.totalRiesgos.toString()];
  }

  cellClicked(args: ICellClickEventArgs) {
    const dialogInstance = this._dialog.open(DetalleRiesgosComponent
      , {
        width: "80%",
        disableClose: false,
        data: { frecuencia: args.xLabel,
                impacto: args.yLabel,
                tipo: 'I' 
              }
      }
      
      );

    // dialogInstance.afterClosed().subscribe( response => {
    //   if(response){
    //     this.cargaRiesgos();
    //   }
    // });
  }
}
