import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CrearVinculacionComponent } from './crear-vinculacion/crear-vinculacion.component';
import { AppStateWithControlRiesgo } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { ControlRiesgo } from '../../../models/controlRiesgo';
import * as actions from 'src/app/store/actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vinculacion',
  templateUrl: './vinculacion.component.html',
  styleUrls: ['./vinculacion.component.css']
})
export class VinculacionComponent implements OnInit, OnDestroy {

  controlSubs: Subscription;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['nombre','riesgoInherente','riesgoResidual','totalControles', 'acciones'];
  // displayedColumns = ['procesoId','subprocesoId','actividadId','riesgoId','nombre','riesgoInherente','riesgoResidual','totalControles', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  controlesRiesgo: ControlRiesgo[];


  constructor(private _dialog: MatDialog,
              private _store: Store<AppStateWithControlRiesgo>) { }

  ngOnDestroy(): void {
    if(this.controlSubs)
      this.controlSubs.unsubscribe();
  }

  cargaVinculados() {
    this._store.dispatch(actions.getControlesVinculados());
    this.controlSubs = this._store.select('controlRiesgo').subscribe(c => this.dataSource.data = c.controlesVinculados);
  }

  ngOnInit(): void {
    this.cargaVinculados();  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource.data?.length > 0)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;    
    dialogConfig.width = "70%";

    const dialogInstance = this._dialog.open(CrearVinculacionComponent, dialogConfig);

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaVinculados();
      }
    });
  }

  dialogEdit(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;    
    dialogConfig.width = "70%";
    dialogConfig.data = { control: element }

    const dialogInstance = this._dialog.open(CrearVinculacionComponent, dialogConfig);

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaVinculados();
      }
    });
  }

  eliminar(riesgoId) {
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
        this._store.dispatch(actions.deleteControlesVinculados({ riesgoId: riesgoId }));
      } 
    })
  }


}
