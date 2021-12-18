import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { CatalogoGrupo } from 'src/app/models/catalogoGrupo';
import { CatalogoService } from '../../../services/catalogo.service';
import { CatalogoGeneral } from '../../../models/catalogoGeneral';
import { AppStateWithCatalogo } from '../../../store/reducers/catalogo.reducers';
import * as catalogoActions from '../../../store/actions/catalogo.actions';
import { CrearCatalogoComponent } from './crear-catalogo/crear-catalogo.component';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit, OnDestroy {

  catalogoGrupos: CatalogoGrupo[];
  catalogoData: CatalogoGeneral[];
  catalogoSubs: Subscription;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['codigo','valor','acciones'];
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
    this.catalogoService.getCatalogoGrupoSegmento('Riesgo').subscribe( c => this.catalogoGrupos = c);
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

  dialogNewItem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;    
    dialogConfig.width = "40%";
    dialogConfig.data = { grupoId: this.grupoId }

    // console.log(this.grupoId);
    const dialogInstance = this.dialog.open(CrearCatalogoComponent, dialogConfig);

    dialogInstance.afterClosed().subscribe( response => {
      console.log(response);
      if(response){
        this.cargaItems(this.grupoId);
      }
    });
  }

  dialogEditItem(item: CatalogoGeneral) {
    const dialogInstance = this.dialog.open(CrearCatalogoComponent
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

  eliminarItem(catalogoId: number) {
    Swal.fire({
      title: 'Esta seguro que desea eliminar el registro?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isDenied) {
        //la actualizacion de la data se esta haciendo en el metodo deletePersonSuccess
        this.store.dispatch(catalogoActions.deleteCatalogo({ catalogoId: catalogoId }));
        //this.cargaItems(this.grupoId);
      } 
    })
  }

}
