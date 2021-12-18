import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogoService } from '../../../../services/catalogo.service';
import { CatalogoGeneral } from '../../../../models/catalogoGeneral';
import { AppStateWithCatalogo } from '../../../../store/reducers/catalogo.reducers';
import { Store } from '@ngrx/store';
import * as catalogoActions from '../../../../store/actions/catalogo.actions';

@Component({
  selector: 'app-edita-factor',
  templateUrl: './edita-factor.component.html',
  styleUrls: ['./edita-factor.component.css']
})
export class EditaFactorComponent implements OnInit {

  catalogoFormGroup: FormGroup;
  tituloDialog: string;
  catalogoItem: CatalogoGeneral;
  procesado: Boolean;

  constructor(private _formBuilder: FormBuilder,
              private _dialogRef: MatDialogRef<EditaFactorComponent>,
              //private _catalogoService: CatalogoService,
              private _store: Store<AppStateWithCatalogo>,
              @Inject(MAT_DIALOG_DATA) private _dataToUpdate: any) { }

  ngOnInit(): void {
    this.tituloDialog = "Editar registro";
    this.catalogoFormGroup = this._formBuilder.group({
      catalogoId: [this._dataToUpdate.item.catalogoId], 
      grupoId: [this._dataToUpdate.item.grupoId], 
      codigo: [this._dataToUpdate.item.codigo], 
      valor: [this._dataToUpdate.item.valor, Validators.required],
      peso: [this._dataToUpdate.item.peso, Validators.required]
    });      
  }

  guardaItem() {
    this.catalogoItem = {
      catalogoId: this.catalogoFormGroup.get('catalogoId').value,
      codigo: this.catalogoFormGroup.get('codigo').value, 
      valor: this.catalogoFormGroup.get('valor').value,
      grupoId: this.catalogoFormGroup.get('grupoId').value,
      peso: this.catalogoFormGroup.get('peso').value
    }
    
    this._store.dispatch(catalogoActions.editCatalogo({ catalogo: this.catalogoItem }));
    this._store.select('catalogo').subscribe(cat => {
      this.procesado = cat.procesado;
      if(this.procesado){        
        this._dialogRef.close(true);
      }
    });
  }

}
