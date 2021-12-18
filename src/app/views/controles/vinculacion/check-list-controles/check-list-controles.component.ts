import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { PageSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { Store } from '@ngrx/store';
import { AppStateWithControles } from '../../../../store/reducers/inventarioControles.reducers';
import * as actions from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ControlRiesgo } from 'src/app/models/controlRiesgo';
//import { InventarioControles } from '../../../../models/inventarioControles';
// import { ControlRiesgoService } from 'src/app/services/controlRiesgo.service';
import { AppStateWithControlRiesgo } from 'src/app/store/reducers';

@Component({
  selector: 'app-check-list-controles',
  templateUrl: './check-list-controles.component.html',
  styleUrls: ['./check-list-controles.component.css']
})
export class CheckListControlesComponent implements OnInit, OnDestroy {

  public selectOptions: Object;
  public toolbar: object[];
  public pageSettings: PageSettingsModel;
  @ViewChild('grid') public grid: GridComponent;

  controlSubs: Subscription;
  controlRiesgoSubs: Subscription;
  controlRiesgo: ControlRiesgo;
  controlSeleccionado: any;
  procesado: Boolean;

  inventarioData: object[];
  
  constructor(private _store: Store<AppStateWithControles>,
              @Inject(MAT_DIALOG_DATA) private _dataRiesgo: any,
              private _storeCR: Store<AppStateWithControlRiesgo>,
              private _dialogRef: MatDialogRef<CheckListControlesComponent>,
              //private _controlService: ControlRiesgoService
              ) { }

  ngOnInit(): void {
    this.selectOptions = { persistSelection: true };
    this.toolbar = [{text:'Agregar seleccionados', tooltipText: 'Agregar seleccionados', prefixIcon: 'add' , id: 'addSelected' },
                    {text:'Cancelar', tooltipText: 'Cerrar ventana', prefixIcon: 'close', id: 'close' }];
    this.pageSettings = { pageSize: 10 };

    this._store.dispatch( actions.getControles());
    this.controlSubs = this._store.select('control').subscribe( p => {
      this.inventarioData = p.inventario;      
    });
  }

  ngOnDestroy(): void {
    if(this.controlSubs)
      this.controlSubs.unsubscribe();
    if(this.controlRiesgoSubs)
      this.controlRiesgoSubs.unsubscribe();
  }

  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'addSelected') {
      let filasSeleccionadas = this.grid.getSelectedRecords();
      if(filasSeleccionadas.length > 0) {        
        filasSeleccionadas.forEach(el => {
          this.controlSeleccionado = el;
          this.controlRiesgo = {
            eventoId: this._dataRiesgo.riesgoId,
            inventarioId: this.controlSeleccionado.controlId,
            reduccion: 0,
            reducirA: '',
            peso: 0,
            suficienciaId: 1
          }
          //this._controlService.addControlRiesgo(this.controlRiesgo).subscribe();
          this._storeCR.dispatch(actions.addControlRiesgo({ control: this.controlRiesgo }));
        });
        this.controlRiesgoSubs = this._storeCR.select('controlRiesgo').subscribe(r => {
          this.procesado = r.procesado;
          if(this.procesado){
            this._dialogRef.close(true);
          }
        });
      }
      //console.log(this.controlRiesgo);
    }

    if (args.item.id === 'close') {
        this._dialogRef.close();
    }
  }
}