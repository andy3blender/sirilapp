import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as controlActions from '../../../../store/actions/inventarioControles.actions';
import { Subscription } from 'rxjs';
import { CatalogoService } from '../../../../services/catalogo.service';
import { AppStateWithControles } from '../../../../store/reducers/inventarioControles.reducers';
import { InventarioControles } from '../../../../models/inventarioControles';
import { CatalogoGeneral } from '../../../../models/catalogoGeneral';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-crear-control',
  templateUrl: './crear-control.component.html',
  styleUrls: ['./crear-control.component.css']
})
export class CrearControlComponent implements OnInit, OnDestroy {

  controlFormGroup: FormGroup;
  controlSubs: Subscription;
  tituloDialog: string;
  procesado: Boolean;
  controlItem: InventarioControles;
  dataAplicacion: CatalogoGeneral[];
  dataPeriodicidad: CatalogoGeneral[];
  dataResponsabilidad: CatalogoGeneral[];
  dataDocumentacion: CatalogoGeneral[];
  
  constructor(private _formBuilder: FormBuilder,
              private _store: Store<AppStateWithControles>,
              private _catalogoService: CatalogoService,
              private _dialogRef: MatDialogRef<CrearControlComponent>,
              @Inject(MAT_DIALOG_DATA) private _dataToUpdate: any) { }
  
  ngOnDestroy(): void {
    if(this.controlSubs)
      this.controlSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargaCatalogos();

    console.log(this._dataToUpdate);
    
    if(this._dataToUpdate) {
      this.tituloDialog = "Editar registro";
      this.controlFormGroup = this._formBuilder.group({
        controlId: [this._dataToUpdate.control.controlId],
        codigo: [this._dataToUpdate.control.codigo, Validators.required],
        nombre: [this._dataToUpdate.control.nombre, Validators.required], 
        detalle: [this._dataToUpdate.control.detalle],        
        aplicacion: [this._dataToUpdate.control.aplicacion.toString(), Validators.required], 
        periodicidad: [this._dataToUpdate.control.periodicidad.toString(), Validators.required], 
        responsabilidad: [this._dataToUpdate.control.responsabilidad.toString(), Validators.required], 
        documentacion: [this._dataToUpdate.control.documentacion.toString(), Validators.required],         
      });
    }
    else {
      this.tituloDialog = "Nuevo registro";
      this.controlFormGroup = this._formBuilder.group({
        controlId: ['0'],
        codigo: ['', Validators.required],
        nombre: ['', Validators.required], 
        detalle: [''],        
        aplicacion: ['', Validators.required], 
        periodicidad: ['', Validators.required], 
        responsabilidad: ['', Validators.required], 
        documentacion: ['', Validators.required],
      });
    }
  }

  cargaCatalogos(): void {
    //aplicacion
    this._catalogoService.getCatalogoItems(10).subscribe(p => this.dataAplicacion = p);
    //periodicidad
    this._catalogoService.getCatalogoItems(9).subscribe(c => this.dataPeriodicidad = c);
    //responsabilidad
    this._catalogoService.getCatalogoItems(11).subscribe(c => this.dataResponsabilidad = c);
    //documentacion
    this._catalogoService.getCatalogoItems(12).subscribe(c => this.dataDocumentacion = c);    
  }

  guardar() {
    if(this._dataToUpdate) {
      this.controlItem = {
        controlId: this.controlFormGroup.get('controlId').value,
        codigo: this.controlFormGroup.get('codigo').value, 
        nombre: this.controlFormGroup.get('nombre').value,
        detalle: this.controlFormGroup.get('detalle').value,
        aplicacion: this.controlFormGroup.get('aplicacion').value,
        periodicidad: this.controlFormGroup.get('periodicidad').value,
        responsabilidad: this.controlFormGroup.get('responsabilidad').value,
        documentacion: this.controlFormGroup.get('documentacion').value,
        estado: 'V'
      }
      this._store.dispatch(controlActions.editControl({ control: this.controlItem }));
    }
    else {      
      this.controlItem = {
        codigo: this.controlFormGroup.get('codigo').value, 
        nombre: this.controlFormGroup.get('nombre').value,
        detalle: this.controlFormGroup.get('detalle').value,
        aplicacion: this.controlFormGroup.get('aplicacion').value,
        periodicidad: this.controlFormGroup.get('periodicidad').value,
        responsabilidad: this.controlFormGroup.get('responsabilidad').value,
        documentacion: this.controlFormGroup.get('documentacion').value,
        estado: 'V'
      }
      this._store.dispatch(controlActions.insertControl({ control: this.controlItem }));
    }

    this.controlSubs = this._store.select('control').subscribe(r => {
      this.procesado = r.procesado;
      if(this.procesado){
        this._dialogRef.close(true);
      }
    });
  }

}
