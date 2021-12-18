import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { InventarioProcesos } from 'src/app/models/inventarioProcesos';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { EditSettingsModel, ToolbarItems, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

import { AppStateWithInventario } from '../../../store/reducers/inventarioProcesos.reducers';
import * as inventarioActions from 'src/app/store/actions';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit, OnDestroy {

  public data: Object[];
  inventarioSubs: Subscription;
  public editSettings: EditSettingsModel;
  public toolbarOptions: ToolbarItems[];
  nuevoProceso: InventarioProcesos;
  public cmbNivel: Object;

  @ViewChild('treegrid')  
  public treeGridObj: TreeGridComponent;

  constructor( private store: Store<AppStateWithInventario> ) { 
    //this.cargaInventario();
  }

  ngOnDestroy(): void {
     this.inventarioSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargaInventario();        
  }

  cargaInventario() {
    this.store.dispatch( inventarioActions.getInventario());
    this.refreshData();
  }

  refreshData() {
    this.inventarioSubs = this.store.select('inventario').subscribe( inv => {
      this.data = JSON.parse(JSON.stringify(inv.inventario));
      //this.treeGridObj.dataSource = this.data;
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', newRowPosition: 'Child', showDeleteConfirmDialog:true };
      this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search'];      
    });
  }

  refreshDataLazy() {
    setTimeout(()=>{ 
      //console.log('1 seg');
      this.treeGridObj.refresh();
    }, 500);   
  }

  rowSelected(args) {    
    if(args.data.level >=4) {
      this.treeGridObj.toolbarModule.enableItems([this.treeGridObj.element.id + '_gridcontrol_add'], false);// disable toolbar items.      
    }
    else{
      this.treeGridObj.toolbarModule.enableItems([this.treeGridObj.element.id + '_gridcontrol_add'], true);// enable toolbar items.
    }
  }

  actionComplete(args): void {
      if(args.requestType === "save") {
        let padreIdv;
        let nivelv = 1;

        if(args.data.level > 0) {
          padreIdv = args.data.parentItem.procesoId;         
        }
          

        if(args.action === "edit") {
          this.nuevoProceso = {
            procesoId: args.data.procesoId,
            codigo: args.data.codigo,
            nombre: args.data.nombre,
            padreId: padreIdv,
            nivel: args.data.nivel,
            estado: 'V'
          }
          
          this.store.dispatch( inventarioActions.editInventario({ proceso: this.nuevoProceso}));

        }
        else if(args.action === "add"){
          //console.log(args.data.level);
          if(args.data.level > 0){
            nivelv = parseInt(args.data.parentItem.nivel)+1;
          }
          this.nuevoProceso = {
            codigo: args.data.codigo,
            nombre: args.data.nombre,
            padreId: padreIdv, 
            nivel: nivelv, 
            estado: 'V'
          }          
          this.store.dispatch( inventarioActions.insertInventario({ proceso: this.nuevoProceso}));
        }
        this.refreshDataLazy();
        //this.treeGridObj.refresh();        
      }

      if(args.requestType === "delete") {
        // console.log(args.data);
        // console.log(args.data[0].procesoId);
        this.store.dispatch(inventarioActions.deleteInventario({ procesoId: args.data[0].procesoId })); 
        this.refreshDataLazy();   
        //this.treeGridObj.refresh();
      }    
  }

}
