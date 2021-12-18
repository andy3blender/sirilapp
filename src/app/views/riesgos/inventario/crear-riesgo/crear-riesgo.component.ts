import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as riesgoActions from '../../../../store/actions/riesgo.actions';
import { Subscription } from 'rxjs';
import { AppStateWithRiesgo } from '../../../../store/reducers/riesgo.reducers';
import { Riesgo } from '../../../../models/riesgo';
import { CatalogoGeneral } from '../../../../models/catalogoGeneral';
import { CatalogoService } from '../../../../services/catalogo.service';
import { InventarioProcesosService } from '../../../../services/inventarioProcesos.service';
import { InventarioProcesos } from 'src/app/models/inventarioProcesos';

@Component({
  selector: 'app-crear-riesgo',
  templateUrl: './crear-riesgo.component.html',
  styleUrls: ['./crear-riesgo.component.css']
})
export class CrearRiesgoComponent implements OnInit, OnDestroy {

  riesgoFormGroup: FormGroup;
  riesgoSubs: Subscription;
  tituloDialog: string;
  procesado: Boolean;
  riesgoItem: Riesgo;
  cargos: CatalogoGeneral[];
  factor: CatalogoGeneral[];
  frecuencia: CatalogoGeneral[];
  impacto: CatalogoGeneral[];
  tipoEvento: CatalogoGeneral[];
  tipoEvento2: CatalogoGeneral[];
  fuente: CatalogoGeneral[];
  procesos: InventarioProcesos[];
  actividades: InventarioProcesos[];
  actividadSeleccionada: number;
  editandoSubproceso: number;
  editandoActividad: number;
  
  constructor(private _formBuilder: FormBuilder,
              private _store: Store<AppStateWithRiesgo>,
              private _catalogoService: CatalogoService,
              private _procesosService: InventarioProcesosService,
              private _dialogRef: MatDialogRef<CrearRiesgoComponent>,
              @Inject(MAT_DIALOG_DATA) private _dataToUpdate: any) { }

  ngOnDestroy(): void {
    if(this.riesgoSubs)
      this.riesgoSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargaCatalogos();
    
    if(this._dataToUpdate) {
      console.log(this._dataToUpdate);
      if(this._dataToUpdate.riesgo.tipoEvento){
        this._catalogoService.getCatalogoItemsHijos(4, this._dataToUpdate.riesgo.tipoEvento).subscribe(c => this.tipoEvento2 = c);
      }
      if(this._dataToUpdate.riesgo.subprocesoId){
        this.editandoSubproceso = this._dataToUpdate.riesgo.subprocesoId;
        this._procesosService.getProceosHijos(this.editandoSubproceso).subscribe(p => this.actividades = p);
        this.editandoActividad = this._dataToUpdate.riesgo.procesoId;
      }

      this.tituloDialog = "Editar registro";
      this.actividadSeleccionada = this._dataToUpdate.riesgo.procesoId;
      this.riesgoFormGroup = this._formBuilder.group({
        riesgoId: [this._dataToUpdate.riesgo.riesgoId],
        codigo: [this._dataToUpdate.riesgo.codigo],
        nombre: [this._dataToUpdate.riesgo.nombre, Validators.required], 
        descripcion: [this._dataToUpdate.riesgo.descripcion],        
        responsable: [this._dataToUpdate.riesgo.responsable, Validators.required], 
        factorRiesgo: [this._dataToUpdate.riesgo.factorRiesgo, Validators.required], 
        frecuencia: [this._dataToUpdate.riesgo.frecuencia.toString(), Validators.required], 
        impacto: [this._dataToUpdate.riesgo.impacto.toString(), Validators.required], 
        tipoEvento: [this._dataToUpdate.riesgo.tipoEvento, Validators.required], 
        tipoEvento2: [this._dataToUpdate.riesgo.tipoEvento2, Validators.required],
        fuenteRiesgo: [this._dataToUpdate.riesgo.fuenteRiesgo, Validators.required], 
      });
    }
    else {
      this.tituloDialog = "Nuevo registro";
      this.riesgoFormGroup = this._formBuilder.group({
        riesgoId: ['0'],
        codigo: ['', Validators.required],
        nombre: ['', Validators.required], 
        descripcion: [''],
        responsable: ['', Validators.required], 
        factorRiesgo: ['', Validators.required], 
        frecuencia: ['', Validators.required], 
        impacto: ['', Validators.required], 
        tipoEvento: ['', Validators.required], 
        tipoEvento2: ['', Validators.required], 
        fuenteRiesgo: ['', Validators.required], 
      });
    }
  }

  cargaCatalogos(): void {
    //sub procesos
    this._procesosService.getInventarioPorNivel(4).subscribe(p => this.procesos = p);
    //cargos
    this._catalogoService.getCatalogoItems(5).subscribe(c => this.cargos = c);
    //factor
    this._catalogoService.getCatalogoItems(2).subscribe(c => this.factor = c);
    //frecuencia
    this._catalogoService.getCatalogoItems(6).subscribe(c => this.frecuencia = c);
    //impacto
    this._catalogoService.getCatalogoItems(7).subscribe(c => this.impacto = c);
    //tipo evento
    this._catalogoService.getCatalogoItems(3).subscribe(c => this.tipoEvento = c);
    //fuente
    this._catalogoService.getCatalogoItems(8).subscribe(c => this.fuente = c);
  }

  cmbTipoEventoChange(event): void {
    //console.log(event);
    this._catalogoService.getCatalogoItemsHijos(4, event).subscribe(c => this.tipoEvento2 = c);
  }

  cmbProcesoChange(event): void {
    this._procesosService.getProceosHijos(event).subscribe(p => this.actividades = p);
  }

  cmbActividadChange(event): void {
    this.actividadSeleccionada = event;
  }

  guardar() {
    if(this._dataToUpdate) {
      this.riesgoItem = {
        riesgoId: this.riesgoFormGroup.get('riesgoId').value,
        procesoId: this.actividadSeleccionada,
        codigo: this.riesgoFormGroup.get('codigo').value, 
        nombre: this.riesgoFormGroup.get('nombre').value,
        descripcion: this.riesgoFormGroup.get('descripcion').value,
        responsable: this.riesgoFormGroup.get('responsable').value,
        factorRiesgo: this.riesgoFormGroup.get('factorRiesgo').value,
        frecuencia: this.riesgoFormGroup.get('frecuencia').value,
        impacto: this.riesgoFormGroup.get('impacto').value,
        tipoEvento: this.riesgoFormGroup.get('tipoEvento').value,
        tipoEvento2: this.riesgoFormGroup.get('tipoEvento2').value,
        fuenteRiesgo: this.riesgoFormGroup.get('fuenteRiesgo').value,
        estado: 'V'
      }
      this._store.dispatch(riesgoActions.editRiesgo({ riesgo: this.riesgoItem }));
    }
    else {      
      this.riesgoItem = {
        procesoId: this.actividadSeleccionada, 
        codigo: this.riesgoFormGroup.get('codigo').value, 
        nombre: this.riesgoFormGroup.get('nombre').value,
        descripcion: this.riesgoFormGroup.get('descripcion').value,
        responsable: this.riesgoFormGroup.get('responsable').value,
        factorRiesgo: this.riesgoFormGroup.get('factorRiesgo').value,
        frecuencia: this.riesgoFormGroup.get('frecuencia').value,
        impacto: this.riesgoFormGroup.get('impacto').value,
        tipoEvento: this.riesgoFormGroup.get('tipoEvento').value,
        tipoEvento2: this.riesgoFormGroup.get('tipoEvento2').value,
        fuenteRiesgo: this.riesgoFormGroup.get('fuenteRiesgo').value,
        estado: 'V'
      }
      this._store.dispatch(riesgoActions.addRiesgo({ riesgo: this.riesgoItem }));
    }

    this.riesgoSubs = this._store.select('riesgo').subscribe(r => {
      this.procesado = r.procesado;
      if(this.procesado){
        this._dialogRef.close(true);
      }
    });

  }

}
