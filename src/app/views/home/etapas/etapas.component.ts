import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithDash } from '../../../store/reducers/dashboard.reducers';
import * as actions from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { Dashboard } from 'src/app/models/dashboard';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.css']
})

export class EtapasComponent implements OnInit, OnDestroy {

  riesgoFactorSubs: Subscription;
  riesgoFuenteSubs: Subscription;
  riesgoTipoEventoSubs: Subscription;
  RIpromedioSubs: Subscription;
  RRpromedioSubs: Subscription; 

  promedioRiesgos: Dashboard;
  promedioInherente: number=0;
  promedioResidual: number=0;

  public primaryXAxis: Object;
  public legendSettings: Object;
  public tooltip: Object;

  public chartTEData: Object[];
  public titleTE: string;
  public chartFRData: Object[];
  public titleFR: string;
  public pieFactorData: Object[];
  public titlePieFactor: string;
  public palette: string[];
  public paletteBar: string[];
  public marker: Object; // labels en barras
  public datalabel: Object; // lables en pie
  public titleGaugeStyle: Object;
  
  //gauge
  public rangoMinBajo: number=0;
  public rangoMaxBajo: number=5;
  public rangoMinMedio: number=5;
  public rangoMaxMedio: number=10;
  public rangoMinAlto: number=10;
  public rangoMaxAlto: number=16;
  public rangoMinCritico: number=16;
  public rangoMaxCritico: number=25;
  
  public colorBajo: string='#57BE06';
  public colorMedio: string='#F8EB25'
  ;public colorAlto: string='#FF6600';
  public colorCritico: string='#F71010';
  annotaionsGaugeI: Object;
  annotaionsGaugeR: Object;

  public lineStyle: Object = {
    width: 10, color: 'transparent'
  };
  //Initializing LabelStyle
  public labelStyle: Object = {
      position: 'Inside', useRangeColor: false,
      font: { size: '12px', fontFamily: 'Roboto', fontStyle: 'Regular' }
  };
  public majorTicks: Object = {
    height: 10, offset: 5
  };
  public minorTicks: Object = {
      height: 0
  };
  public tail: Object = {
    length: '18%'
  };
  public pointerCap: Object = {
      radius: 7
  };
  
  constructor(private _store: Store<AppStateWithDash>) { }


  riesgosPorFactor() {
    this.titlePieFactor = 'Total de riesgos por factor';
    this._store.dispatch( actions.getRiesgosFactor({tipo: 'FC'}));
    this.riesgoFactorSubs = this._store.select('dash').subscribe( p => {
      this.pieFactorData = p.riesgoFactor;
    });
  }

  riesgosPorFuente() {
    this.titleFR = 'Total de riesgos por fuente de riesgo';
    this._store.dispatch( actions.getRiesgosFuente({tipo: 'FR'}));
    this.riesgoFuenteSubs = this._store.select('dash').subscribe( p => {
      this.chartFRData = p.riesgoFuente;
    });
  }

  riesgosPorTipoEvento() {
    this.titleTE = 'Total de riesgos por tipo de evento';
    this._store.dispatch( actions.getRiesgosTipoEvento({tipo: 'TE'}));
    this.riesgoTipoEventoSubs = this._store.select('dash').subscribe( p => {
      this.chartTEData = p.riesgoTipoEvento;
    });
  }

  RIpromedio() {
    this._store.dispatch( actions.getRIpromedio({tipo: 'PR'}));
    this.RIpromedioSubs = this._store.select('dash').subscribe( p => {
      this.promedioRiesgos = p.riPromedio;
      if(this.promedioRiesgos){
        this.promedioInherente = parseFloat(this.promedioRiesgos.nombreVariable);
        this.promedioResidual = this.promedioRiesgos.total; 
        
        this.annotaionsGaugeI = [
            {
              content: `<div><span style="font-size:24px; font-family:Regular">${this.promedioInherente}</span></div>`,
              radius: '40%', angle: 180, zIndex:'1'
            }
        ];
        this.annotaionsGaugeR = [
          {
            content: `<div><span style="font-size:24px; font-family:Regular">${this.promedioResidual}</span></div>`,
            radius: '40%', angle: 180, zIndex:'1'
          }
      ];
      }
    });
  }

  ngOnDestroy(): void {
    if(this.riesgoFactorSubs)
      this.riesgoFactorSubs.unsubscribe();
    if(this.riesgoFuenteSubs)
      this.riesgoFuenteSubs.unsubscribe();
    if(this.riesgoTipoEventoSubs)
      this.riesgoTipoEventoSubs.unsubscribe();
    if(this.RIpromedioSubs)
      this.RIpromedioSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.marker = { dataLabel: { visible: true }};
    this.datalabel = { visible: true };
    this.palette = ["#F6B53F","#81C80B","#3C70D6","#E94649","#6FAAB0","#FF33F3","#228B22","#3399FF","#D7551C"]
    this.paletteBar = ["#C99EF8"]
    this.primaryXAxis = {
      valueType: 'Category'
    };
    this.legendSettings = {
      visible: true,
      position: 'Bottom'
    }
    this.tooltip = {
      enable: true
    }
    this.titleGaugeStyle = {
      //size: '12px', fontFamily: 'Roboto', fontStyle: 'Regular',
      fontWeight:'bold'
    };

    this.RIpromedio();
    this.riesgosPorFactor();
    this.riesgosPorTipoEvento();
    this.riesgosPorFuente();    
  }
}
