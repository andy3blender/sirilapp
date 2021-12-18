import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { CatalogoService } from '../../../services/catalogo.service';
import { CatalogoGrupo } from '../../../models/catalogoGrupo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import * as catalogoActions from '../../../store/actions/catalogo.actions';
import { AppStateWithCatalogo } from '../../../store/reducers/catalogo.reducers';
import { EditaVariableComponent } from './edita-variable/edita-variable.component';
import { EditaFactorComponent } from './edita-factor/edita-factor.component';
import { CatalogoGeneral } from '../../../models/catalogoGeneral';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit, OnDestroy {

  catalogoGrupos: CatalogoGrupo[];
  catalogoSubs: Subscription;
  dataSourceVariable: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsVariable = ['grupoId','nombre','peso','acciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['codigo','valor','peso','acciones'];
  grupoId: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private catalogoService: CatalogoService,
              private store: Store<AppStateWithCatalogo>,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGruposCatalogos();
  }
  ngOnDestroy(): void {
    if(this.catalogoSubs)
      this.catalogoSubs.unsubscribe;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource.data?.length > 0)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getGruposCatalogos(): void {
    this.catalogoService.getCatalogoGrupoSegmento('Control').subscribe( c => {
      this.catalogoGrupos = c
      this.dataSourceVariable.data = this.catalogoGrupos.filter(d => d.codigo != 'SUFICIENCIA');
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  totalPonderacionVariables(): number {
    if(this.catalogoGrupos)
      return this.catalogoGrupos.reduce((ac, cur) => ac+cur.peso, 0);      
  }

  grupoChange(item) {
    //console.log(item);
    this.cargaItems(item);
    this.grupoId = item;
  }

  cargaItems(grupoId: number) {
    this.store.dispatch( catalogoActions.getCatalogo({ grupoId: grupoId }));
    this.catalogoSubs = this.store.select('catalogo').subscribe( cat => {
      this.dataSource.data = cat.catalogo;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  dialogEditItem(item: CatalogoGrupo) {
    const dialogInstance = this.dialog.open(EditaVariableComponent
      , {
        width: "40%",
        disableClose: true,
        data: { item: item }
      }      
      );

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.getGruposCatalogos();
      }
    });
  }

  dialogEditFactor(item: CatalogoGeneral) {
    const dialogInstance = this.dialog.open(EditaFactorComponent
      , {
        width: "40%",
        disableClose: true,
        data: { item: item }
      }      
      );

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaItems(this.grupoId);
      }
    });
  }
}
