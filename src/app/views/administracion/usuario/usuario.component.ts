import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { personaUsuario } from 'src/app/models/personaUsuario';
import * as usuarioActions from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { AppStateWithUsuario } from 'src/app/store/reducers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuarioData: personaUsuario[];
  usuariosSubs: Subscription;
  //material
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['login','empleado','nombrePerfil','activo','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private store: Store<AppStateWithUsuario>,
               public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargaUsuarios();
  }

  ngOnDestroy(): void {
    this.usuariosSubs.unsubscribe;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource.data?.length > 0)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargaUsuarios() {
    this.store.dispatch( usuarioActions.getUsuarios());
    this.usuariosSubs = this.store.select('usuario').subscribe( us => {
      this.dataSource.data = us.usuarios;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  dialogNewUsuario() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;    
    dialogConfig.width = "40%";

    const dialogInstance = this.dialog.open(CrearUsuarioComponent, dialogConfig);

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaUsuarios();
      }
    });
  }

  dialogEditUsuario(usuario: personaUsuario) {
    const dialogInstance = this.dialog.open(CrearUsuarioComponent
      , {
        width: "40%",
        disableClose: true,
        data: { usuario: usuario }
      }
      
      );

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaUsuarios();    
      }
    });
  }

  eliminarUsuario(usuarioId: number) {
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
        this.store.dispatch(usuarioActions.deleteUsuario({ usuarioId: usuarioId }));
      } 
    })
  }

}
