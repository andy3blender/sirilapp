(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{L1LG:function(o,t,e){"use strict";e.r(t),e.d(t,"RiesgosModule",function(){return _o});var i=e("ofXK"),r=e("tyNb"),a=e("+0xr"),c=e("M9IT"),s=e("Dh3D"),n=e("0IaG"),l=e("PSD3"),b=e.n(l),d=e("e2k9"),m=e("3Pt+"),u=e("fXoL"),g=e("l7P3"),p=e("kmnG"),h=e("qFsG"),f=e("bTqV"),v=e("NFeN");function E(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function C(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}let V=(()=>{class o{constructor(o,t,e,i){this._formBuilder=o,this._store=t,this._dialogRef=e,this._dataToUpdate=i}ngOnInit(){this._dataToUpdate.hasOwnProperty("item")?(this.tituloDialog="Editar registro",this.catalogoFormGroup=this._formBuilder.group({catalogoId:[this._dataToUpdate.item.catalogoId],grupoId:[this._dataToUpdate.item.grupoId],codigo:[this._dataToUpdate.item.codigo,m.p.required],valor:[this._dataToUpdate.item.valor,m.p.required]})):(this.tituloDialog="Nuevo registro",this.catalogoFormGroup=this._formBuilder.group({catalogoId:["0"],grupoId:[this._dataToUpdate.grupoId],codigo:["",m.p.required],valor:["",m.p.required]}))}guardaItem(){this._dataToUpdate.hasOwnProperty("item")?(this.catalogoItem={catalogoId:this.catalogoFormGroup.get("catalogoId").value,codigo:this.catalogoFormGroup.get("codigo").value,valor:this.catalogoFormGroup.get("valor").value,grupoId:this.catalogoFormGroup.get("grupoId").value},this._store.dispatch(d.g({catalogo:this.catalogoItem}))):(this.catalogoItem={codigo:this.catalogoFormGroup.get("codigo").value,valor:this.catalogoFormGroup.get("valor").value,grupoId:this._dataToUpdate.grupoId},this._store.dispatch(d.a({catalogo:this.catalogoItem}))),this._store.select("catalogo").subscribe(o=>{this.procesado=o.procesado,this.procesado&&this._dialogRef.close(!0)})}}return o.\u0275fac=function(t){return new(t||o)(u.Qb(m.d),u.Qb(g.h),u.Qb(n.h),u.Qb(n.a))},o.\u0275cmp=u.Kb({type:o,selectors:[["app-crear-catalogo"]],decls:35,vars:5,consts:[["mat-dialog-title",""],[1,"mat-typography"],[3,"formGroup"],[2,"display","block","visibility","hidden","height","0","width","0"],["matInput","","formControlName","catalogoId"],["matInput","","formControlName","grupoId"],[1,"col-sm-12","col-md-6"],["matInput","","formControlName","codigo","required",""],[4,"ngIf"],["matInput","","formControlName","valor","required",""],["align","end"],["mat-raised-button","","mat-dialog-close","","color","warn"],["mat-raised-button","","color","primary",3,"disabled","click"]],template:function(o,t){1&o&&(u.Wb(0,"h3",0),u.Ec(1),u.Vb(),u.Wb(2,"mat-dialog-content",1),u.Wb(3,"form",2),u.Wb(4,"div",3),u.Wb(5,"mat-form-field"),u.Wb(6,"mat-label"),u.Ec(7,"CatalogoId"),u.Vb(),u.Rb(8,"input",4),u.Vb(),u.Vb(),u.Wb(9,"div",3),u.Wb(10,"mat-form-field"),u.Wb(11,"mat-label"),u.Ec(12,"GrupoId"),u.Vb(),u.Rb(13,"input",5),u.Vb(),u.Vb(),u.Wb(14,"div",6),u.Wb(15,"mat-form-field"),u.Wb(16,"mat-label"),u.Ec(17,"C\xf3digo"),u.Vb(),u.Rb(18,"input",7),u.Cc(19,E,2,0,"mat-error",8),u.Vb(),u.Vb(),u.Wb(20,"div",6),u.Wb(21,"mat-form-field"),u.Wb(22,"mat-label"),u.Ec(23,"Valor"),u.Vb(),u.Rb(24,"input",9),u.Cc(25,C,2,0,"mat-error",8),u.Vb(),u.Vb(),u.Vb(),u.Vb(),u.Wb(26,"mat-dialog-actions",10),u.Wb(27,"button",11),u.Wb(28,"mat-icon"),u.Ec(29,"not_interested"),u.Vb(),u.Ec(30," Cancelar "),u.Vb(),u.Wb(31,"button",12),u.dc("click",function(){return t.guardaItem()}),u.Wb(32,"mat-icon"),u.Ec(33,"save"),u.Vb(),u.Ec(34," Guardar "),u.Vb(),u.Vb()),2&o&&(u.Eb(1),u.Fc(t.tituloDialog),u.Eb(2),u.mc("formGroup",t.catalogoFormGroup),u.Eb(16),u.mc("ngIf",null==t.catalogoFormGroup.get("codigo").errors?null:t.catalogoFormGroup.get("codigo").errors.required),u.Eb(6),u.mc("ngIf",null==t.catalogoFormGroup.get("valor").errors?null:t.catalogoFormGroup.get("valor").errors.required),u.Eb(6),u.mc("disabled",!t.catalogoFormGroup.valid))},directives:[n.i,n.f,m.q,m.l,m.f,p.c,p.g,h.b,m.c,m.k,m.e,m.o,i.k,n.c,f.a,n.d,v.a,p.b],styles:[""]}),o})();var W=e("FesS"),I=e("d3UM"),F=e("Qu3c"),G=e("FKr1");function _(o,t){if(1&o&&(u.Wb(0,"mat-option",17),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.mc("value",o.grupoId),u.Eb(1),u.Gc(" ",o.nombre," ")}}function w(o,t){1&o&&(u.Wb(0,"th",18),u.Ec(1," Codigo "),u.Vb())}function S(o,t){if(1&o&&(u.Wb(0,"td",19),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.Eb(1),u.Gc(" ",o.codigo," ")}}function R(o,t){1&o&&(u.Wb(0,"th",18),u.Ec(1," Valor "),u.Vb())}function T(o,t){if(1&o&&(u.Wb(0,"td",19),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.Eb(1),u.Gc(" ",o.valor," ")}}function q(o,t){1&o&&u.Rb(0,"th",20)}function y(o,t){if(1&o){const o=u.Xb();u.Wb(0,"td",21),u.Wb(1,"a",22),u.dc("click",function(){u.vc(o);const e=t.$implicit;return u.hc().dialogEditItem(e)}),u.Wb(2,"mat-icon"),u.Ec(3,"edit"),u.Vb(),u.Vb(),u.Wb(4,"a",23),u.dc("click",function(){u.vc(o);const e=t.$implicit;return u.hc().eliminarItem(e.catalogoId)}),u.Wb(5,"mat-icon"),u.Ec(6,"delete"),u.Vb(),u.Vb(),u.Vb()}}function D(o,t){1&o&&u.Rb(0,"tr",24)}function O(o,t){1&o&&u.Rb(0,"tr",25)}const U=function(){return[5,10,25,100]};let k=(()=>{class o{constructor(o,t,e){this.catalogoService=o,this.store=t,this.dialog=e,this.dataSource=new a.o,this.displayedColumns=["codigo","valor","acciones"],this.grupoId=0}ngOnInit(){this.getGruposCatalogos()}ngOnDestroy(){}applyFilter(o){var t;(null===(t=this.dataSource.data)||void 0===t?void 0:t.length)>0&&(this.dataSource.filter=o.target.value.trim().toLowerCase())}getGruposCatalogos(){this.catalogoService.getCatalogoGrupoSegmento("Riesgo").subscribe(o=>this.catalogoGrupos=o)}grupoChange(o){this.cargaItems(o),this.grupoId=o}cargaItems(o){this.store.dispatch(d.j({grupoId:o})),this.catalogoSubs=this.store.select("catalogo").subscribe(o=>{this.dataSource.data=o.catalogo,this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort})}dialogNewItem(){const o=new n.e;o.disableClose=!0,o.width="40%",o.data={grupoId:this.grupoId},this.dialog.open(V,o).afterClosed().subscribe(o=>{console.log(o),o&&this.cargaItems(this.grupoId)})}dialogEditItem(o){this.dialog.open(V,{width:"40%",disableClose:!0,data:{item:o}}).afterClosed().subscribe(o=>{o&&this.cargaItems(this.grupoId)})}eliminarItem(o){b.a.fire({title:"Esta seguro que desea eliminar el registro?",icon:"warning",showDenyButton:!0,showCancelButton:!0,showConfirmButton:!1,denyButtonText:"Eliminar",cancelButtonText:"Cancelar"}).then(t=>{t.isDenied&&this.store.dispatch(d.d({catalogoId:o}))})}}return o.\u0275fac=function(t){return new(t||o)(u.Qb(W.a),u.Qb(g.h),u.Qb(n.b))},o.\u0275cmp=u.Kb({type:o,selectors:[["app-catalogo"]],viewQuery:function(o,t){if(1&o&&(u.Ic(c.a,1),u.Ic(s.a,1)),2&o){let o;u.rc(o=u.ec())&&(t.paginator=o.first),u.rc(o=u.ec())&&(t.sort=o.first)}},decls:24,vars:7,consts:[[1,"search-div"],["appearance","fill"],[3,"valueChange"],[3,"value",4,"ngFor","ngForOf"],["mat-raised-button","","matTooltip","Crear nuevo registro","color","primary",1,"btn-add",3,"disabled","click"],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","codigo"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","valor"],["matColumnDef","acciones"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","style","text-align: right;",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"pageSizeOptions"],[3,"value"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-cell","",2,"text-align","right"],["matTooltip","Editar",1,"pointer",2,"color","#1f5164",3,"click"],["matTooltip","Eliminar",1,"pointer",2,"color","#e15634",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(o,t){1&o&&(u.Wb(0,"div",0),u.Wb(1,"mat-form-field",1),u.Wb(2,"mat-label"),u.Ec(3,"Cat\xe1logos disponibles"),u.Vb(),u.Wb(4,"mat-select",2),u.dc("valueChange",function(o){return t.grupoChange(o)}),u.Cc(5,_,2,2,"mat-option",3),u.Vb(),u.Vb(),u.Vb(),u.Wb(6,"button",4),u.dc("click",function(){return t.dialogNewItem()}),u.Wb(7,"mat-icon"),u.Ec(8,"add"),u.Vb(),u.Ec(9,"Crear\n"),u.Vb(),u.Wb(10,"div",5),u.Wb(11,"table",6),u.Ub(12,7),u.Cc(13,w,2,0,"th",8),u.Cc(14,S,2,1,"td",9),u.Tb(),u.Ub(15,10),u.Cc(16,R,2,0,"th",8),u.Cc(17,T,2,1,"td",9),u.Tb(),u.Ub(18,11),u.Cc(19,q,1,0,"th",12),u.Cc(20,y,7,0,"td",13),u.Tb(),u.Cc(21,D,1,0,"tr",14),u.Cc(22,O,1,0,"tr",15),u.Vb(),u.Rb(23,"mat-paginator",16),u.Vb()),2&o&&(u.Eb(5),u.mc("ngForOf",t.catalogoGrupos),u.Eb(1),u.mc("disabled",0==t.grupoId),u.Eb(5),u.mc("dataSource",t.dataSource),u.Eb(10),u.mc("matHeaderRowDef",t.displayedColumns),u.Eb(1),u.mc("matRowDefColumns",t.displayedColumns),u.Eb(1),u.mc("pageSizeOptions",u.oc(6,U)))},directives:[p.c,p.g,I.a,i.j,f.a,F.a,v.a,a.n,s.a,a.c,a.i,a.b,a.k,a.m,c.a,G.k,a.h,s.b,a.a,a.j,a.l],styles:["table[_ngcontent-%COMP%]{width:100%}.pointer[_ngcontent-%COMP%]{cursor:pointer}.search-div[_ngcontent-%COMP%]{margin:10px}.search-form-field[_ngcontent-%COMP%]{width:85%;margin-left:10px}"]}),o})();var N=e("v8Ou"),P=e("nXXY"),$=e("IbWt");function B(o,t){if(1&o&&(u.Wb(0,"mat-option",11),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.mc("value",o.procesoId),u.Eb(1),u.Gc(" ",o.nombre," ")}}function Q(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function x(o,t){if(1&o&&(u.Wb(0,"mat-option",11),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.mc("value",o.procesoId),u.Eb(1),u.Gc(" ",o.nombre," ")}}function M(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function j(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function H(o,t){if(1&o&&(u.Wb(0,"mat-option",11),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.mc("value",o.codigo),u.Eb(1),u.Gc(" ",o.valor," ")}}function z(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function X(o,t){if(1&o&&(u.Wb(0,"mat-option",11),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.mc("value",o.codigo),u.Eb(1),u.Gc(" ",o.valor," ")}}function A(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function K(o,t){if(1&o&&(u.Wb(0,"mat-option",11),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.mc("value",o.codigo),u.Eb(1),u.Gc(" ",o.valor," ")}}function L(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function J(o,t){if(1&o&&(u.Wb(0,"mat-option",11),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.mc("value",o.codigo),u.Eb(1),u.Gc(" ",o.valor," ")}}function Y(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function Z(o,t){if(1&o&&(u.Wb(0,"mat-option",11),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.mc("value",o.codigo),u.Eb(1),u.Gc(" ",o.valor," ")}}function oo(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function to(o,t){if(1&o&&(u.Wb(0,"mat-option",11),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.mc("value",o.codigo),u.Eb(1),u.Gc(" ",o.valor," ")}}function eo(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function io(o,t){if(1&o&&(u.Wb(0,"mat-option",11),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.mc("value",o.codigo),u.Eb(1),u.Gc(" ",o.valor," ")}}function ro(o,t){1&o&&(u.Wb(0,"mat-error"),u.Ec(1,"Campo obligatorio"),u.Vb())}function ao(o,t){if(1&o){const o=u.Xb();u.Wb(0,"div"),u.Wb(1,"div",12),u.Wb(2,"mat-form-field",13),u.Wb(3,"mat-label"),u.Ec(4,"RiesgoId"),u.Vb(),u.Rb(5,"input",14),u.Vb(),u.Vb(),u.Wb(6,"div",3),u.Wb(7,"mat-form-field",4),u.Wb(8,"mat-label"),u.Ec(9,"C\xf3digo"),u.Vb(),u.Rb(10,"input",15),u.Cc(11,M,2,0,"mat-error",7),u.Vb(),u.Vb(),u.Wb(12,"div",3),u.Wb(13,"mat-form-field",4),u.Wb(14,"mat-label"),u.Ec(15,"Nombre"),u.Vb(),u.Rb(16,"input",16),u.Cc(17,j,2,0,"mat-error",7),u.Vb(),u.Vb(),u.Wb(18,"div",17),u.Wb(19,"mat-form-field",18),u.Wb(20,"mat-label"),u.Ec(21,"Descripci\xf3n"),u.Vb(),u.Rb(22,"textarea",19),u.Vb(),u.Vb(),u.Wb(23,"div",3),u.Wb(24,"mat-form-field",4),u.Wb(25,"mat-label"),u.Ec(26,"Responsable"),u.Vb(),u.Wb(27,"mat-select",20),u.Cc(28,H,2,2,"mat-option",6),u.Vb(),u.Cc(29,z,2,0,"mat-error",7),u.Vb(),u.Vb(),u.Wb(30,"div",3),u.Wb(31,"mat-form-field",4),u.Wb(32,"mat-label"),u.Ec(33,"Factor"),u.Vb(),u.Wb(34,"mat-select",21),u.Cc(35,X,2,2,"mat-option",6),u.Vb(),u.Cc(36,A,2,0,"mat-error",7),u.Vb(),u.Vb(),u.Wb(37,"div",3),u.Wb(38,"mat-form-field",4),u.Wb(39,"mat-label"),u.Ec(40,"Frecuencia"),u.Vb(),u.Wb(41,"mat-select",22),u.Cc(42,K,2,2,"mat-option",6),u.Vb(),u.Cc(43,L,2,0,"mat-error",7),u.Vb(),u.Vb(),u.Wb(44,"div",3),u.Wb(45,"mat-form-field",4),u.Wb(46,"mat-label"),u.Ec(47,"Impacto"),u.Vb(),u.Wb(48,"mat-select",23),u.Cc(49,J,2,2,"mat-option",6),u.Vb(),u.Cc(50,Y,2,0,"mat-error",7),u.Vb(),u.Vb(),u.Wb(51,"div",3),u.Wb(52,"mat-form-field",4),u.Wb(53,"mat-label"),u.Ec(54,"Tipo de evento"),u.Vb(),u.Wb(55,"mat-select",24),u.dc("valueChange",function(t){return u.vc(o),u.hc().cmbTipoEventoChange(t)}),u.Cc(56,Z,2,2,"mat-option",6),u.Vb(),u.Cc(57,oo,2,0,"mat-error",7),u.Vb(),u.Vb(),u.Wb(58,"div",3),u.Wb(59,"mat-form-field",4),u.Wb(60,"mat-label"),u.Ec(61,"Causa"),u.Vb(),u.Wb(62,"mat-select",25),u.Cc(63,to,2,2,"mat-option",6),u.Vb(),u.Cc(64,eo,2,0,"mat-error",7),u.Vb(),u.Vb(),u.Wb(65,"div",3),u.Wb(66,"mat-form-field",4),u.Wb(67,"mat-label"),u.Ec(68,"Fuente de riego"),u.Vb(),u.Wb(69,"mat-select",26),u.Cc(70,io,2,2,"mat-option",6),u.Vb(),u.Cc(71,ro,2,0,"mat-error",7),u.Vb(),u.Vb(),u.Vb()}if(2&o){const o=u.hc();u.Eb(11),u.mc("ngIf",null==o.riesgoFormGroup.get("codigo").errors?null:o.riesgoFormGroup.get("codigo").errors.required),u.Eb(6),u.mc("ngIf",null==o.riesgoFormGroup.get("nombre").errors?null:o.riesgoFormGroup.get("nombre").errors.required),u.Eb(11),u.mc("ngForOf",o.cargos),u.Eb(1),u.mc("ngIf",null==o.riesgoFormGroup.get("responsable").errors?null:o.riesgoFormGroup.get("responsable").errors.required),u.Eb(6),u.mc("ngForOf",o.factor),u.Eb(1),u.mc("ngIf",null==o.riesgoFormGroup.get("factorRiesgo").errors?null:o.riesgoFormGroup.get("factorRiesgo").errors.required),u.Eb(6),u.mc("ngForOf",o.frecuencia),u.Eb(1),u.mc("ngIf",null==o.riesgoFormGroup.get("frecuencia").errors?null:o.riesgoFormGroup.get("frecuencia").errors.required),u.Eb(6),u.mc("ngForOf",o.impacto),u.Eb(1),u.mc("ngIf",null==o.riesgoFormGroup.get("impacto").errors?null:o.riesgoFormGroup.get("impacto").errors.required),u.Eb(6),u.mc("ngForOf",o.tipoEvento),u.Eb(1),u.mc("ngIf",null==o.riesgoFormGroup.get("tipoEvento").errors?null:o.riesgoFormGroup.get("tipoEvento").errors.required),u.Eb(6),u.mc("ngForOf",o.tipoEvento2),u.Eb(1),u.mc("ngIf",null==o.riesgoFormGroup.get("tipoEvento2").errors?null:o.riesgoFormGroup.get("tipoEvento2").errors.required),u.Eb(6),u.mc("ngForOf",o.fuente),u.Eb(1),u.mc("ngIf",null==o.riesgoFormGroup.get("fuenteRiesgo").errors?null:o.riesgoFormGroup.get("fuenteRiesgo").errors.required)}}let co=(()=>{class o{constructor(o,t,e,i,r,a){this._formBuilder=o,this._store=t,this._catalogoService=e,this._procesosService=i,this._dialogRef=r,this._dataToUpdate=a}ngOnDestroy(){this.riesgoSubs&&this.riesgoSubs.unsubscribe()}ngOnInit(){this.cargaCatalogos(),this._dataToUpdate?(console.log(this._dataToUpdate),this._dataToUpdate.riesgo.tipoEvento&&this._catalogoService.getCatalogoItemsHijos(4,this._dataToUpdate.riesgo.tipoEvento).subscribe(o=>this.tipoEvento2=o),this._dataToUpdate.riesgo.subprocesoId&&(this.editandoSubproceso=this._dataToUpdate.riesgo.subprocesoId,this._procesosService.getProceosHijos(this.editandoSubproceso).subscribe(o=>this.actividades=o),this.editandoActividad=this._dataToUpdate.riesgo.procesoId),this.tituloDialog="Editar registro",this.actividadSeleccionada=this._dataToUpdate.riesgo.procesoId,this.riesgoFormGroup=this._formBuilder.group({riesgoId:[this._dataToUpdate.riesgo.riesgoId],codigo:[this._dataToUpdate.riesgo.codigo],nombre:[this._dataToUpdate.riesgo.nombre,m.p.required],descripcion:[this._dataToUpdate.riesgo.descripcion],responsable:[this._dataToUpdate.riesgo.responsable,m.p.required],factorRiesgo:[this._dataToUpdate.riesgo.factorRiesgo,m.p.required],frecuencia:[this._dataToUpdate.riesgo.frecuencia.toString(),m.p.required],impacto:[this._dataToUpdate.riesgo.impacto.toString(),m.p.required],tipoEvento:[this._dataToUpdate.riesgo.tipoEvento,m.p.required],tipoEvento2:[this._dataToUpdate.riesgo.tipoEvento2,m.p.required],fuenteRiesgo:[this._dataToUpdate.riesgo.fuenteRiesgo,m.p.required]})):(this.tituloDialog="Nuevo registro",this.riesgoFormGroup=this._formBuilder.group({riesgoId:["0"],codigo:["",m.p.required],nombre:["",m.p.required],descripcion:[""],responsable:["",m.p.required],factorRiesgo:["",m.p.required],frecuencia:["",m.p.required],impacto:["",m.p.required],tipoEvento:["",m.p.required],tipoEvento2:["",m.p.required],fuenteRiesgo:["",m.p.required]}))}cargaCatalogos(){this._procesosService.getInventarioPorNivel(4).subscribe(o=>this.procesos=o),this._catalogoService.getCatalogoItems(5).subscribe(o=>this.cargos=o),this._catalogoService.getCatalogoItems(2).subscribe(o=>this.factor=o),this._catalogoService.getCatalogoItems(6).subscribe(o=>this.frecuencia=o),this._catalogoService.getCatalogoItems(7).subscribe(o=>this.impacto=o),this._catalogoService.getCatalogoItems(3).subscribe(o=>this.tipoEvento=o),this._catalogoService.getCatalogoItems(8).subscribe(o=>this.fuente=o)}cmbTipoEventoChange(o){this._catalogoService.getCatalogoItemsHijos(4,o).subscribe(o=>this.tipoEvento2=o)}cmbProcesoChange(o){this._procesosService.getProceosHijos(o).subscribe(o=>this.actividades=o)}cmbActividadChange(o){this.actividadSeleccionada=o}guardar(){this._dataToUpdate?(this.riesgoItem={riesgoId:this.riesgoFormGroup.get("riesgoId").value,procesoId:this.actividadSeleccionada,codigo:this.riesgoFormGroup.get("codigo").value,nombre:this.riesgoFormGroup.get("nombre").value,descripcion:this.riesgoFormGroup.get("descripcion").value,responsable:this.riesgoFormGroup.get("responsable").value,factorRiesgo:this.riesgoFormGroup.get("factorRiesgo").value,frecuencia:this.riesgoFormGroup.get("frecuencia").value,impacto:this.riesgoFormGroup.get("impacto").value,tipoEvento:this.riesgoFormGroup.get("tipoEvento").value,tipoEvento2:this.riesgoFormGroup.get("tipoEvento2").value,fuenteRiesgo:this.riesgoFormGroup.get("fuenteRiesgo").value,estado:"V"},this._store.dispatch(P.g({riesgo:this.riesgoItem}))):(this.riesgoItem={procesoId:this.actividadSeleccionada,codigo:this.riesgoFormGroup.get("codigo").value,nombre:this.riesgoFormGroup.get("nombre").value,descripcion:this.riesgoFormGroup.get("descripcion").value,responsable:this.riesgoFormGroup.get("responsable").value,factorRiesgo:this.riesgoFormGroup.get("factorRiesgo").value,frecuencia:this.riesgoFormGroup.get("frecuencia").value,impacto:this.riesgoFormGroup.get("impacto").value,tipoEvento:this.riesgoFormGroup.get("tipoEvento").value,tipoEvento2:this.riesgoFormGroup.get("tipoEvento2").value,fuenteRiesgo:this.riesgoFormGroup.get("fuenteRiesgo").value,estado:"V"},this._store.dispatch(P.a({riesgo:this.riesgoItem}))),this.riesgoSubs=this._store.select("riesgo").subscribe(o=>{this.procesado=o.procesado,this.procesado&&this._dialogRef.close(!0)})}}return o.\u0275fac=function(t){return new(t||o)(u.Qb(m.d),u.Qb(g.h),u.Qb(W.a),u.Qb($.a),u.Qb(n.h),u.Qb(n.a))},o.\u0275cmp=u.Kb({type:o,selectors:[["app-crear-riesgo"]],decls:28,vars:8,consts:[["mat-dialog-title",""],[1,"mat-typography"],[3,"formGroup"],[1,"col-sm-12","col-md-6"],[1,"inputForm","celdaIndiviual"],[3,"value","valueChange"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],["align","end"],["mat-raised-button","","mat-dialog-close","","color","warn"],["mat-raised-button","","color","primary",3,"click"],[3,"value"],[2,"display","block","visibility","hidden","height","0","width","0"],[1,"inputForm"],["matInput","","formControlName","riesgoId"],["matInput","","formControlName","codigo","required",""],["matInput","","formControlName","nombre","required",""],[1,"col-sm-12","col-md-12"],[1,"inputForm","celdaCombinada"],["matInput","","formControlName","descripcion"],["formControlName","responsable","required",""],["formControlName","factorRiesgo","required",""],["formControlName","frecuencia","required",""],["formControlName","impacto","required",""],["formControlName","tipoEvento","required","",3,"valueChange"],["formControlName","tipoEvento2","required",""],["formControlName","fuenteRiesgo","required",""]],template:function(o,t){1&o&&(u.Wb(0,"h3",0),u.Ec(1),u.Vb(),u.Wb(2,"mat-dialog-content",1),u.Wb(3,"form",2),u.Wb(4,"div"),u.Wb(5,"div",3),u.Wb(6,"mat-form-field",4),u.Wb(7,"mat-label"),u.Ec(8,"Proceso"),u.Vb(),u.Wb(9,"mat-select",5),u.dc("valueChange",function(o){return t.cmbProcesoChange(o)}),u.Cc(10,B,2,2,"mat-option",6),u.Vb(),u.Cc(11,Q,2,0,"mat-error",7),u.Vb(),u.Vb(),u.Wb(12,"div",3),u.Wb(13,"mat-form-field",4),u.Wb(14,"mat-label"),u.Ec(15,"Actividad"),u.Vb(),u.Wb(16,"mat-select",5),u.dc("valueChange",function(o){return t.cmbActividadChange(o)}),u.Cc(17,x,2,2,"mat-option",6),u.Vb(),u.Vb(),u.Vb(),u.Vb(),u.Cc(18,ao,72,16,"div",7),u.Vb(),u.Vb(),u.Wb(19,"mat-dialog-actions",8),u.Wb(20,"button",9),u.Wb(21,"mat-icon"),u.Ec(22,"not_interested"),u.Vb(),u.Ec(23," Cancelar "),u.Vb(),u.Wb(24,"button",10),u.dc("click",function(){return t.guardar()}),u.Wb(25,"mat-icon"),u.Ec(26,"save"),u.Vb(),u.Ec(27," Guardar "),u.Vb(),u.Vb()),2&o&&(u.Eb(1),u.Fc(t.tituloDialog),u.Eb(2),u.mc("formGroup",t.riesgoFormGroup),u.Eb(6),u.mc("value",t.editandoSubproceso),u.Eb(1),u.mc("ngForOf",t.procesos),u.Eb(1),u.mc("ngIf",null==t.riesgoFormGroup.get("responsable").errors?null:t.riesgoFormGroup.get("responsable").errors.required),u.Eb(5),u.mc("value",t.editandoActividad),u.Eb(1),u.mc("ngForOf",t.actividades),u.Eb(1),u.mc("ngIf",t.actividadSeleccionada))},directives:[n.i,n.f,m.q,m.l,m.f,p.c,p.g,I.a,i.j,i.k,n.c,f.a,n.d,v.a,G.k,p.b,h.b,m.c,m.k,m.e,m.o],styles:[".celdaIndiviual[_ngcontent-%COMP%]{width:80%}.celdaCombinada[_ngcontent-%COMP%]{width:90%}"]}),o})();function so(o,t){1&o&&(u.Wb(0,"th",19),u.Ec(1," C\xf3digo "),u.Vb())}function no(o,t){if(1&o&&(u.Wb(0,"td",20),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.Eb(1),u.Gc(" ",o.codigo," ")}}function lo(o,t){1&o&&(u.Wb(0,"th",19),u.Ec(1," Riesgo "),u.Vb())}function bo(o,t){if(1&o&&(u.Wb(0,"td",20),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.Eb(1),u.Gc(" ",o.nombre," ")}}function mo(o,t){1&o&&(u.Wb(0,"th",21),u.Ec(1," Frecuencia "),u.Vb())}function uo(o,t){if(1&o&&(u.Wb(0,"td",20),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.Eb(1),u.Gc(" ",o.frecuencia," ")}}function go(o,t){1&o&&(u.Wb(0,"th",21),u.Ec(1," Impacto "),u.Vb())}function po(o,t){if(1&o&&(u.Wb(0,"td",20),u.Ec(1),u.Vb()),2&o){const o=t.$implicit;u.Eb(1),u.Gc(" ",o.impacto," ")}}function ho(o,t){1&o&&u.Rb(0,"th",21)}function fo(o,t){if(1&o){const o=u.Xb();u.Wb(0,"td",22),u.Wb(1,"a",23),u.dc("click",function(){u.vc(o);const e=t.$implicit;return u.hc().dialogEdit(e)}),u.Wb(2,"mat-icon"),u.Ec(3,"edit"),u.Vb(),u.Vb(),u.Wb(4,"a",24),u.dc("click",function(){u.vc(o);const e=t.$implicit;return u.hc().eliminar(e.riesgoId)}),u.Wb(5,"mat-icon"),u.Ec(6,"delete"),u.Vb(),u.Vb(),u.Vb()}}function vo(o,t){1&o&&u.Rb(0,"tr",25)}function Eo(o,t){1&o&&u.Rb(0,"tr",26)}const Co=function(){return[5,10,25,100]},Vo=[{path:"",children:[{path:"inventario",component:(()=>{class o{constructor(o,t){this._store=o,this._dialog=t,this.dataSource=new a.o,this.displayedColumns=["codigo","nombre","frecuencia","impacto","acciones"]}ngOnInit(){this.cargaRiesgos()}ngOnDestroy(){this.riesgoSubs&&this.riesgoSubs.unsubscribe()}applyFilter(o){var t;(null===(t=this.dataSource.data)||void 0===t?void 0:t.length)>0&&(this.dataSource.filter=o.target.value.trim().toLowerCase())}cargaRiesgos(){this._store.dispatch(N.B()),this.riesgoSubs=this._store.select("riesgo").subscribe(o=>{this.dataSource.data=o.riesgos,this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort})}dialogNew(){const o=new n.e;o.disableClose=!1,o.width="70%",this._dialog.open(co,o).afterClosed().subscribe(o=>{o&&this.cargaRiesgos()})}dialogEdit(o){this._dialog.open(co,{width:"70%",disableClose:!0,data:{riesgo:o}}).afterClosed().subscribe(o=>{o&&this.cargaRiesgos()})}eliminar(o){b.a.fire({title:"Esta seguro que desea eliminar el registro?",icon:"warning",showDenyButton:!0,showCancelButton:!0,showConfirmButton:!1,denyButtonText:"Eliminar",cancelButtonText:"Cancelar"}).then(t=>{t.isDenied&&this._store.dispatch(N.l({riesgoId:o}))})}}return o.\u0275fac=function(t){return new(t||o)(u.Qb(g.h),u.Qb(n.b))},o.\u0275cmp=u.Kb({type:o,selectors:[["app-inventario"]],viewQuery:function(o,t){if(1&o&&(u.Ic(c.a,1),u.Ic(s.a,1)),2&o){let o;u.rc(o=u.ec())&&(t.paginator=o.first),u.rc(o=u.ec())&&(t.sort=o.first)}},decls:30,vars:5,consts:[[1,"search-div"],["mat-raised-button","","matTooltip","Crear nuevo registro","color","primary",1,"btn-add",3,"click"],[1,"search-form-field"],["matInput","","placeholder","Buscar",3,"keyup"],["input",""],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","codigo"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","nombre"],["matColumnDef","frecuencia"],["mat-header-cell","",4,"matHeaderCellDef"],["matColumnDef","impacto"],["matColumnDef","acciones"],["mat-cell","","style","text-align: right;",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["pageSize","10","aria-label","Select page of perfils",3,"pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-cell","",2,"text-align","right"],["matTooltip","Editar",1,"pointer",2,"color","#1f5164",3,"click"],["matTooltip","Eliminar",1,"pointer",2,"color","#e15634",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(o,t){1&o&&(u.Wb(0,"div",0),u.Wb(1,"button",1),u.dc("click",function(){return t.dialogNew()}),u.Wb(2,"mat-icon"),u.Ec(3,"add"),u.Vb(),u.Ec(4,"Crear "),u.Vb(),u.Wb(5,"mat-form-field",2),u.Wb(6,"mat-label"),u.Ec(7,"Filter"),u.Vb(),u.Wb(8,"input",3,4),u.dc("keyup",function(o){return t.applyFilter(o)}),u.Vb(),u.Vb(),u.Vb(),u.Wb(10,"div",5),u.Wb(11,"table",6),u.Ub(12,7),u.Cc(13,so,2,0,"th",8),u.Cc(14,no,2,1,"td",9),u.Tb(),u.Ub(15,10),u.Cc(16,lo,2,0,"th",8),u.Cc(17,bo,2,1,"td",9),u.Tb(),u.Ub(18,11),u.Cc(19,mo,2,0,"th",12),u.Cc(20,uo,2,1,"td",9),u.Tb(),u.Ub(21,13),u.Cc(22,go,2,0,"th",12),u.Cc(23,po,2,1,"td",9),u.Tb(),u.Ub(24,14),u.Cc(25,ho,1,0,"th",12),u.Cc(26,fo,7,0,"td",15),u.Tb(),u.Cc(27,vo,1,0,"tr",16),u.Cc(28,Eo,1,0,"tr",17),u.Vb(),u.Rb(29,"mat-paginator",18),u.Vb()),2&o&&(u.Eb(11),u.mc("dataSource",t.dataSource),u.Eb(16),u.mc("matHeaderRowDef",t.displayedColumns),u.Eb(1),u.mc("matRowDefColumns",t.displayedColumns),u.Eb(1),u.mc("pageSizeOptions",u.oc(4,Co)))},directives:[f.a,F.a,v.a,p.c,p.g,h.b,a.n,s.a,a.c,a.i,a.b,a.k,a.m,c.a,a.h,s.b,a.a,a.j,a.l],styles:["table[_ngcontent-%COMP%]{width:100%}.pointer[_ngcontent-%COMP%]{cursor:pointer}.search-div[_ngcontent-%COMP%]{margin:10px}.search-form-field[_ngcontent-%COMP%]{width:85%;margin-left:10px}"]}),o})()},{path:"catalogoRiesgo",component:k},{path:"**",redirectTo:"inventario"}]}];let Wo=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=u.Ob({type:o}),o.\u0275inj=u.Nb({imports:[[r.e.forChild(Vo)],r.e]}),o})();var Io=e("wZkO"),Fo=e("7Mg6"),Go=e("Af5F");let _o=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=u.Ob({type:o}),o.\u0275inj=u.Nb({imports:[[i.c,g.j.forFeature("catalogo",Fo.a),g.j.forFeature("riesgo",Go.a),m.n,Wo,Io.c,I.b,v.b,f.b,h.c,a.p,F.b,p.e,c.b,s.c,n.g]]}),o})()}}]);