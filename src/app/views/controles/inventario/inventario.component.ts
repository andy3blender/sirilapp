import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as actions from 'src/app/store/actions';
import { CrearControlComponent } from './crear-control/crear-control.component';
import { AppStateWithControles } from '../../../store/reducers/inventarioControles.reducers';
import { InventarioControles } from '../../../models/inventarioControles';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit, OnDestroy {

  controlSubs: Subscription;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['nombre','nombreAplicacion','nombrePeriodicidad','nombreResponsabilidad', 'nombreDocumentacion', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _store: Store<AppStateWithControles>,
              private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargaControles();
  }

  ngOnDestroy(): void {
    if(this.controlSubs)
      this.controlSubs.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource.data?.length > 0)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargaControles() {
    this._store.dispatch( actions.getControles());
    this.controlSubs = this._store.select('control').subscribe( p => {
      this.dataSource.data = p.inventario;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  dialogNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;    
    dialogConfig.width = "70%";

    const dialogInstance = this._dialog.open(CrearControlComponent, dialogConfig);

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaControles();
      }
    });
  }

  dialogEdit(control: InventarioControles) {
    const dialogInstance = this._dialog.open(CrearControlComponent
      , {
        width: "70%",
        disableClose: true,
        data: { control: control }
      }
      
      );

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaControles();
      }
    });
  }

  eliminar(controlId: number) {
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
        this._store.dispatch(actions.deleteControl({ controlId: controlId }));
      } 
    })
  }

}
