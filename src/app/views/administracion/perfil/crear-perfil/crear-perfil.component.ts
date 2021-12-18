import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppStateWithPermisoPerfil } from '../../../../store/reducers/permisoPerfil.reducers';
import { getPermisoPerfil } from '../../../../store/actions/permisoPerfil.actions';
import * as perfilActions from '../../../../store/actions/perfil.actions';
import { Subscription } from 'rxjs';
import { Perfil } from '../../../../models/perfil';
import { AppStateWithPerfil } from '../../../../store/reducers/perfil.reducers';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { Permiso } from '../../../../models/permiso';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})
export class CrearPerfilComponent implements OnInit, OnDestroy {

  perfilFormGroup: FormGroup;
  permisoSubs: Subscription;
  tituloDialog: string;
  procesado: Boolean;
  menusSeleccionados: string[];
  menusPadres: string[]=[];
  menusFinal: string[];
  perfil: Perfil;
  permiso: Permiso;

  @ViewChild('tree')
  public tree: TreeViewComponent;


  constructor(private _formBuilder: FormBuilder,
              private _store: Store<AppStateWithPermisoPerfil>,
              private _storePerfil: Store<AppStateWithPerfil>,
              private _dialogRef: MatDialogRef<CrearPerfilComponent>,
              @Inject(MAT_DIALOG_DATA) private _dataToUpdate: any) { }

public field: Object; // = { dataSource: this.countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
public showCheckBox: boolean = true;

ngOnDestroy() {
  this.permisoSubs.unsubscribe();
}

ngOnInit(): void {
    if(this._dataToUpdate) {
      this._store.dispatch(getPermisoPerfil({perfilId: this._dataToUpdate.perfil.perfilId}));
      
      this.tituloDialog = "Editar registro";
      this.perfilFormGroup = this._formBuilder.group({
        perfilId: [this._dataToUpdate.perfil.perfilId],
        nombre: [this._dataToUpdate.perfil.nombre, Validators.required], 
        descripcion: [this._dataToUpdate.perfil.descripcion],        
      });

      this.permisoSubs = this._store.select('permisoPerfil').subscribe(p=> {
        //this.permisosPerfil = p.permisos;
        this.field = {dataSource: p.permisos, id: 'menuId', parentID: 'padreId', text: 'nombre', hasChildren: 'tieneHijos', isChecked: 'tienePermiso'}
      });

    }
    else {
      this.tituloDialog = "Nuevo registro";
      this._store.dispatch(getPermisoPerfil({perfilId: 0}));
      this.perfilFormGroup = this._formBuilder.group({
        perfilId: ['0'],
        nombre: ['', Validators.required], 
        descripcion: [''],
      });

      this.permisoSubs = this._store.select('permisoPerfil').subscribe(p=> {
        //this.permisosPerfil = p.permisos;
        this.field = {dataSource: p.permisos, id: 'menuId', parentID: 'padreId', text: 'nombre', hasChildren: 'tieneHijos', isChecked: 'tienePermiso'}
      });
    }
  }

  guardaPermisos() {
    this.menusSeleccionados = this.tree.getAllCheckedNodes();
    
    let parentId: string;
    this.menusSeleccionados.forEach(el => {
      if(this.tree.getNode(el).parentID !== null && this.tree.getNode(el).parentID !== "") {
        parentId = this.tree.getNode(el).parentID.toString();
        if(this.menusPadres.indexOf(parentId) === -1){
          this.menusPadres.push(parentId); 
        }
          
      }
    });

    this.menusFinal = this.menusSeleccionados.concat(this.menusPadres); 

    this.menusFinal = [...new Set(this.menusFinal)]; //set elimina los duplicados

    if(this._dataToUpdate) {
      this.perfil = {
        perfilId: this.perfilFormGroup.get('perfilId').value,
        nombre: this.perfilFormGroup.get('nombre').value,
        descripcion: this.perfilFormGroup.get('descripcion').value,     
        estado: 'V'   
      }

      this._store.dispatch(perfilActions.editPerfil({ perfil: this.perfil, permiso: this.menusFinal }));

      this._storePerfil.select('perfil').subscribe( p => {
        this.procesado = p.procesado;
        if(this.procesado){
          this._dialogRef.close(true);
        }
      });
    }
    
    else {      
      this.perfil = {
        nombre: this.perfilFormGroup.get('nombre').value,
        descripcion: this.perfilFormGroup.get('descripcion').value,     
        estado: 'V'
      }
    
      this._store.dispatch(perfilActions.addPerfil({ perfil: this.perfil, permiso: this.menusFinal }));
  
      this._storePerfil.select('perfil').subscribe( p => {
        this.procesado = p.procesado;
        if(this.procesado){
          this._dialogRef.close(true);
        }
      });
  }
}

}
