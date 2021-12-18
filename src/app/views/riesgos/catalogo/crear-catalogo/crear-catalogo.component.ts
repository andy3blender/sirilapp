import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppStateWithCatalogo } from '../../../../store/reducers/catalogo.reducers';
import { CatalogoGeneral } from '../../../../models/catalogoGeneral';
import * as catalogoActions from '../../../../store/actions/catalogo.actions';

@Component({
  selector: 'app-crear-catalogo',
  templateUrl: './crear-catalogo.component.html',
  styleUrls: ['./crear-catalogo.component.css']
})
export class CrearCatalogoComponent implements OnInit {

  catalogoFormGroup: FormGroup;
  tituloDialog: string;
  procesado: Boolean;
  catalogoItem: CatalogoGeneral;

  constructor(private _formBuilder: FormBuilder,
              private _store: Store<AppStateWithCatalogo>,
              private _dialogRef: MatDialogRef<CrearCatalogoComponent>,
              @Inject(MAT_DIALOG_DATA) private _dataToUpdate: any) { }

  ngOnInit(): void {

    // console.log(this._dataToUpdate);
    // console.log(this._dataToUpdate.grupoId);

    if(this._dataToUpdate.hasOwnProperty('item')) {
      this.tituloDialog = "Editar registro";
      this.catalogoFormGroup = this._formBuilder.group({
        catalogoId: [this._dataToUpdate.item.catalogoId], 
        grupoId: [this._dataToUpdate.item.grupoId], 
        codigo: [this._dataToUpdate.item.codigo, Validators.required], 
        valor: [this._dataToUpdate.item.valor, Validators.required]
      });
    }
    else {
      this.tituloDialog = "Nuevo registro";
      this.catalogoFormGroup = this._formBuilder.group({
        catalogoId: ['0'],
        grupoId: [this._dataToUpdate.grupoId],
        codigo: ['', Validators.required], 
        valor: ['', Validators.required]        
      });
    }
  }

  guardaItem() {
    if(this._dataToUpdate.hasOwnProperty('item')) {
      this.catalogoItem = {
        catalogoId: this.catalogoFormGroup.get('catalogoId').value,
        codigo: this.catalogoFormGroup.get('codigo').value, 
        valor: this.catalogoFormGroup.get('valor').value,
        grupoId: this.catalogoFormGroup.get('grupoId').value
      }
      //console.log(this.catalogoItem);
      this._store.dispatch(catalogoActions.editCatalogo({ catalogo: this.catalogoItem }));
    }
    else {      
      this.catalogoItem = {
        //catalogoId: this.usuarioFormGroup.get('empleadoId').value,
        codigo: this.catalogoFormGroup.get('codigo').value, 
        valor: this.catalogoFormGroup.get('valor').value,
        grupoId: this._dataToUpdate.grupoId
      }
      this._store.dispatch(catalogoActions.addCatalogo({ catalogo: this.catalogoItem }));
    }

    this._store.select('catalogo').subscribe(cat => {
      this.procesado = cat.procesado;
      if(this.procesado){
        //console.log('Insertado, cerrar');
        this._dialogRef.close(true);
      }
    });

  }
}
