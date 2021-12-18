import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
//import { AppSate } from '../../../store/app.reducer';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Persona } from 'src/app/models/Persona';
import { Subscription } from 'rxjs';
import * as personaActions from 'src/app/store/actions';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import Swal from 'sweetalert2';
import { AppStateWithPersona } from '../../../store/reducers/persona.reducers';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit, OnDestroy {

  personaData: Persona[];
  personaSubs: Subscription;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['identificacion', 'nombres', 'apellidos', 'email','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor( private store: Store<AppStateWithPersona>, 
               public dialog: MatDialog               
               ) {}

  ngOnInit(): void {
    this.cargaEmpleados();
  }

  ngOnDestroy(): void {
    this.personaSubs.unsubscribe;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource.data?.length > 0)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargaEmpleados() {
    this.store.dispatch( personaActions.getPersonas());
    this.personaSubs = this.store.select('persona').subscribe( person => {
      this.dataSource.data = person.personas;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  DialogNewEmpleado() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    
    const dialogInstance = this.dialog.open(CrearEmpleadoComponent, dialogConfig);

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaEmpleados();        
      }
    });
  }

  DialogEditEmpleado(empleado: Persona) {
    const dialogInstance = this.dialog.open(CrearEmpleadoComponent
      , {
        width: "40%",
        disableClose: true,
        data: { empleado: empleado }        
      }
      
      );

    dialogInstance.afterClosed().subscribe( response => {
      if(response){
        this.cargaEmpleados();        
      }
    });
  }

  eliminarEmpleado(personaId: string) {
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
        this.store.dispatch(personaActions.deletePersona({ personaId: personaId }));
      } 
    })
  }

}
