import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AppStateWithRiesgo } from '../../../store/reducers/riesgo.reducers';
import * as actions from 'src/app/store/actions';
import { CrearRiesgoComponent } from './crear-riesgo/crear-riesgo.component';
import { Riesgo } from 'src/app/models/riesgo';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit, OnDestroy {

  riesgoSubs: Subscription;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['codigo','nombre','frecuencia','impacto','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _store: Store<AppStateWithRiesgo>,
              private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargaRiesgos();
  }

  ngOnDestroy(): void {
    if(this.riesgoSubs)
      this.riesgoSubs.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource.data?.length > 0)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargaRiesgos() {
    this._store.dispatch( actions.getRiesgos());
    this.riesgoSubs = this._store.select('riesgo').subscribe( p => {
      this.dataSource.data = p.riesgos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  dialogNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;    
    dialogConfig.width = "70%";

    const dialogInstance = this._dialog.open(CrearRiesgoComponent, dialogConfig);

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaRiesgos();
      }
    });
  }

  dialogEdit(riesgo: Riesgo) {
    const dialogInstance = this._dialog.open(CrearRiesgoComponent
      , {
        width: "70%",
        disableClose: true,
        data: { riesgo: riesgo }
      }
      
      );

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaRiesgos();
      }
    });
  }

  eliminar(riesgoId: number) {
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
        this._store.dispatch(actions.deleteRiesgo({ riesgoId: riesgoId }));
      } 
    })
  }

}
