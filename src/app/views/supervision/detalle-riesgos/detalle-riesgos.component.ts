import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { AppStateWithRiesgo } from '../../../store/reducers/riesgo.reducers';
import * as actions from 'src/app/store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-riesgos',
  templateUrl: './detalle-riesgos.component.html',
  styleUrls: ['./detalle-riesgos.component.css']
})
export class DetalleRiesgosComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = [] // ['codigo','nombre','frecuencia','impacto','frecuenciaResidual','impactoResidual','riesgoInherente','riesgoResidual'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  riesgoSubs: Subscription;
  
  constructor( private _store: Store<AppStateWithRiesgo>,
               private _dialogRef: MatDialogRef<DetalleRiesgosComponent>,
               @Inject(MAT_DIALOG_DATA) private _detail: any) { }

  ngOnInit(): void {
    if(this._detail) {
  
      if(this._detail.tipo == 'I'){
        this.displayedColumns = ['codigo','nombre','frecuencia','impacto','riesgoInherente'];
        this.cargaRiesgos(this._detail.frecuencia, this._detail.impacto);
      }
      else if(this._detail.tipo == 'R') {
        this.displayedColumns = ['codigo','nombre','frecuenciaResidual','impactoResidual','riesgoInherente','riesgoResidual'];
        this.cargaRiesgosRR(this._detail.frecuencia, this._detail.impacto);
      }
    }
  }

  ngOnDestroy(): void {
    if(this.riesgoSubs)
      this.riesgoSubs.unsubscribe();
  }

  cargaRiesgos(frecuencia: number, impacto: number) {
    this._store.dispatch( actions.getRiesgosPorRI({frecuencia: frecuencia, impacto: impacto}));
    this.riesgoSubs = this._store.select('riesgo').subscribe( p => {
      this.dataSource.data = p.riesgos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  cargaRiesgosRR(frecuencia: number, impacto: number) {
    this._store.dispatch( actions.getRiesgosPorRR({frecuencia: frecuencia, impacto: impacto}));
    this.riesgoSubs = this._store.select('riesgo').subscribe( p => {
      this.dataSource.data = p.riesgos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
