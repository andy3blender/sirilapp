import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { AppStateWithPerfil } from '../../../store/reducers/perfil.reducers';
import * as actions from 'src/app/store/actions';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { Perfil } from 'src/app/models/Perfil';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {

  perfilSubs: Subscription;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['nombre','descripcion','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _store: Store<AppStateWithPerfil>,
              private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargaPerfiles();
  }

  ngOnDestroy(): void {
    this.perfilSubs.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource.data?.length > 0)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargaPerfiles() {
    this._store.dispatch( actions.getPerfiles());
    this.perfilSubs = this._store.select('perfil').subscribe( p => {
      this.dataSource.data = p.perfiles;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  dialogNewPerfil() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;    
    dialogConfig.width = "70%";

    const dialogInstance = this._dialog.open(CrearPerfilComponent, dialogConfig);

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaPerfiles();
      }
    });
  }

  dialogEditPerfil(perfil: Perfil) {
    const dialogInstance = this._dialog.open(CrearPerfilComponent
      , {
        width: "70%",
        disableClose: true,
        data: { perfil: perfil }
      }
      
      );

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaPerfiles();
      }
    });
  }

  eliminarPerfil(perfilId: number) {
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
        this._store.dispatch(actions.deletePerfil({ perfilId: perfilId }));
      } 
    })
  }

}
