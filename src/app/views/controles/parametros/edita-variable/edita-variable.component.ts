import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogoGrupo } from '../../../../models/catalogoGrupo';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogoService } from '../../../../services/catalogo.service';

@Component({
  selector: 'app-edita-variable',
  templateUrl: './edita-variable.component.html',
  styleUrls: ['./edita-variable.component.css']
})
export class EditaVariableComponent implements OnInit {

  catalogoFormGroup: FormGroup;
  tituloDialog: string;
  catalogoItem: CatalogoGrupo;

  constructor(private _formBuilder: FormBuilder,
              private _dialogRef: MatDialogRef<EditaVariableComponent>,
              private _catalogoService: CatalogoService,
              @Inject(MAT_DIALOG_DATA) private _dataToUpdate: any) { }

  ngOnInit(): void {
    this.tituloDialog = "Editar registro";
      this.catalogoFormGroup = this._formBuilder.group({
        grupoId: [this._dataToUpdate.item.grupoId], 
        codigo: [this._dataToUpdate.item.codigo], 
        nombre: [this._dataToUpdate.item.nombre, Validators.required],
        segmento: [this._dataToUpdate.item.segmento],
        peso: [this._dataToUpdate.item.peso, Validators.required]
      });
  }

  guardaItem() {
    this.catalogoItem = {
      grupoId: this.catalogoFormGroup.get('grupoId').value,
      codigo: this.catalogoFormGroup.get('codigo').value, 
      nombre: this.catalogoFormGroup.get('nombre').value,
      segmento: this.catalogoFormGroup.get('segmento').value,
      peso: this.catalogoFormGroup.get('peso').value
    }
    //console.log(this.catalogoItem);
    this._catalogoService.updateCatalogoGrupo(this.catalogoItem).subscribe(a => this._dialogRef.close(true));    
  }

}
