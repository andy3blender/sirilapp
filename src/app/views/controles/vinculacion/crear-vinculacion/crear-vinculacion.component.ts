import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Riesgo } from 'src/app/models/riesgo';
import { InventarioProcesos } from '../../../../models/inventarioProcesos';
import { InventarioProcesosService } from '../../../../services/inventarioProcesos.service';
import { RiesgoService } from '../../../../services/riesgo.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckListControlesComponent } from '../check-list-controles/check-list-controles.component';
import { ControlRiesgo } from 'src/app/models/controlRiesgo';
import { Store } from '@ngrx/store';
import { AppStateWithControlRiesgo } from '../../../../store/reducers/controlRiesgo.reducers';
import * as actions from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { CommandColumnService, CommandModel, EditSettingsModel, SaveEventArgs, EditService } from '@syncfusion/ej2-angular-grids';
import { CatalogoGeneral } from '../../../../models/catalogoGeneral';
import { CatalogoService } from '../../../../services/catalogo.service';
import { AppStateWithRiesgo } from '../../../../store/reducers/riesgo.reducers';

@Component({
  selector: 'app-crear-vinculacion',
  templateUrl: './crear-vinculacion.component.html',
  styleUrls: ['./crear-vinculacion.component.css'],
  providers: [ CommandColumnService, EditService]
})
export class CrearVinculacionComponent implements OnInit, OnDestroy {

  riesgoFormGroup: FormGroup;
  afectacionFormGroup: FormGroup;
  dataProcesos: InventarioProcesos[];
  dataActividades: InventarioProcesos[];
  dataRiesgo: Riesgo[];
  riesgoSeleccionado: Riesgo;
  controlRiesgoData: ControlRiesgo[];
  controlRiesgo: ControlRiesgo;
  controlRiesgoEditado: any;
  //controlRiesgoEliminado: any;
  controlSubs: Subscription;
  riesgoSubs: Subscription;
  public commands: CommandModel[];
  public editSettings: EditSettingsModel;
  tieneControles: boolean;
  afectacionData: CatalogoGeneral[];
  suficienciaData: CatalogoGeneral[];
  afectacionSeleccionada: number;
  suficienciaSeleccionada: number;

  constructor(private _formBuilder: FormBuilder,
              private _procesosService: InventarioProcesosService,
              private _catalogoService: CatalogoService,
              private _store: Store<AppStateWithControlRiesgo>,
              private _storeRiesgo: Store<AppStateWithRiesgo>,
              private _riesgoService: RiesgoService,
              private _dialog: MatDialog,
              private _dialogRef: MatDialogRef<CrearVinculacionComponent>,
              @Inject(MAT_DIALOG_DATA) private _dataToUpdate: any) {}

  ngOnInit() {
    this.editSettings = { allowEditing: true, allowAdding: false, allowDeleting: true, mode: 'Normal' };

    this.commands = [{ type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
    { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
    { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
    { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }];

    this.cargaCatalogos();

    if(this._dataToUpdate) {

      //console.log(this._dataToUpdate.control);
      //carga catalogos con datos del riesgo y control
      this._procesosService.getProceosHijos(this._dataToUpdate.control.subprocesoId).subscribe(p => this.dataActividades = p);
      this._riesgoService.getRiesgosActividad(this._dataToUpdate.control.actividadId).subscribe(p => this.dataRiesgo = p);
      this.cargaRiesgoSeleccionado(this._dataToUpdate.control.riesgoId);

      this.afectacionSeleccionada = this._dataToUpdate.control.reducirA;
      this.suficienciaSeleccionada = this._dataToUpdate.control.suficienciaId;

      this.riesgoFormGroup = this._formBuilder.group({
        proceso: [this._dataToUpdate.control.subprocesoId, Validators.required],
        actividad: [this._dataToUpdate.control.actividadId, Validators.required],
        riesgo: [this._dataToUpdate.control.riesgoId, Validators.required],
      });
      
      this.afectacionFormGroup = this._formBuilder.group({
        afectacion: [this.afectacionSeleccionada, Validators.required],
        suficiencia: [this.suficienciaSeleccionada.toString(), Validators.required],
      });
    }

    else {
      this.riesgoFormGroup = this._formBuilder.group({
        proceso: ['', Validators.required],
        actividad: ['', Validators.required],
        riesgo: ['', Validators.required],
      });
      
      this.afectacionFormGroup = this._formBuilder.group({
        afectacion: ['', Validators.required],
        suficiencia: ['', Validators.required],
      });
    }

    
  }

  ngOnDestroy(): void {
    if(this.controlSubs)
      this.controlSubs.unsubscribe();   
    if(this.riesgoSubs)
      this.riesgoSubs.unsubscribe();
  }

  cargaCatalogos(): void {
    this._procesosService.getInventarioPorNivel(4).subscribe(p => this.dataProcesos = p);
    //suficicnecia
    this._catalogoService.getCatalogoItems(13).subscribe(c => this.suficienciaData = c);
    //afectacion
    this._catalogoService.getCatalogoItems(14).subscribe(c => this.afectacionData = c);
  }

  cargaControlRiesgo() {
    this._store.dispatch( actions.getControlRiesgo({riesgoId: this.riesgoSeleccionado.riesgoId}));
    this.controlSubs = this._store.select('controlRiesgo').subscribe( p => {
      //this.controlRiesgoData = p.controlRiesgo;
      this.controlRiesgoData = JSON.parse(JSON.stringify(p.controlRiesgo)); 
      //this.tieneControles = p.controlRiesgo.length > 0 ? true : false;

      setTimeout(()=>{ 
        this.tieneControles = p.controlRiesgo?.length > 0 ? true : false;
      }, 500);
    });    
  }

  cmbProcesoChange(event): void {
    this._procesosService.getProceosHijos(event).subscribe(p => this.dataActividades = p);
  }

  cmbActividadChange(event): void {
    this._riesgoService.getRiesgosActividad(event).subscribe(p => this.dataRiesgo = p);
  }

  cargaRiesgoSeleccionado(riesgoId: number) {
    this._storeRiesgo.dispatch( actions.getRiesgo({ riesgoId: riesgoId }));
    this.riesgoSubs = this._storeRiesgo.select('riesgo').subscribe( p => {     
      this.riesgoSeleccionado = p.unRiesgo;
    });

    setTimeout(()=>{ 
      this.cargaControlRiesgo();
    }, 500);
  }

  cmbRiesgoChange(event): void {    
    this.cargaRiesgoSeleccionado(event.value);
    // this._storeRiesgo.dispatch( actions.getRiesgo({ riesgoId: event.value }));
    // this.riesgoSubs = this._storeRiesgo.select('riesgo').subscribe( p => {     
    //   this.riesgoSeleccionado = p.unRiesgo;
    // });

    // setTimeout(()=>{ 
    //   this.cargaControlRiesgo();
    // }, 500);
    
  }

  dialogInventario() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;    
    dialogConfig.width = "70%";
    dialogConfig.data = { riesgoId: this.riesgoSeleccionado.riesgoId }

    const dialogInstance = this._dialog.open(CheckListControlesComponent, dialogConfig);

    dialogInstance.afterClosed().subscribe( response => {
      console.log(response);
      if(response){
        this.cargaControlRiesgo();
      }
    });
  }
  
  actionBegin(args: SaveEventArgs): void {
    //console.log(args);
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      //console.log(args.rowData);
      this.controlRiesgoEditado = Object.assign({}, args.rowData);
    }
    if (args.requestType === 'save') {
      //console.log(args.data);
      this.controlRiesgoEditado = Object.assign({}, args.data);
      //console.log(this.controlRiesgoEditado);
      this._store.dispatch( actions.editControlRiesgo({ control: this.controlRiesgoEditado }));
      
      setTimeout(()=>{ 
        this.cargaControlRiesgo();
      }, 100);
      //this.cargaControlRiesgo();
      // if (this.orderForm.valid) {
        //     args.data = this.orderData;
        // } else {
        //     args.cancel = true;
        // }
    }
    if (args.requestType === 'delete') {
      //console.log(args.data[0].controlEventoId);
      this._store.dispatch( actions.deleteControlRiesgo({ controlId: args.data[0].controlEventoId }));
  }
}

// actionComplete(args): void {
//     if(args.requestType === "save") {
//       if(args.action === "edit") {
//         this.cargaControlRiesgo();
//       }
//       // else if(args.action === "add"){
//       //   console.log(args);
//       // }
//     }
// }

cmbAfectacionChange(event): void {  
  console.log(event);
  this.afectacionSeleccionada = event;  
}

cmbSuficienciaChange(event): void {  
  console.log(event);
  this.suficienciaSeleccionada = event; 
}

calculoResidual() {
  this.controlRiesgo = {
    eventoId: this.riesgoSeleccionado.riesgoId,
    reducirA: this.afectacionSeleccionada.toString(),
    suficienciaId: this.suficienciaSeleccionada
  }  

  console.log(this.controlRiesgo);
  
  this._store.dispatch( actions.calculoResidual({ control: this.controlRiesgo }));
  // this.riesgoSubs = this._storeRiesgo.select('riesgo').subscribe( p => {     
  //   this.riesgoSeleccionado = JSON.parse(JSON.stringify(p.unRiesgo));
  // });  
}

finalizar() {
  this._dialogRef.close(true);
}

}
