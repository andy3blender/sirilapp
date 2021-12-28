// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { provideMockStore, MockStore } from '@ngrx/store/testing';
// import { InventarioComponent } from './inventario.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MatDialogModule, MatDialog } from '@angular/material/dialog';

// describe('Tests sobre componente "InventarioComponent"', () => {
//   let component: InventarioComponent;
//   let fixture: ComponentFixture<InventarioComponent>;
//   let store: MockStore;
//   const initialState = { loggedIn: false };

//   beforeEach(async () => {
      
//     await TestBed.configureTestingModule({
//       imports:[ReactiveFormsModule, FormsModule, HttpClientTestingModule, MatDialogModule],
//       declarations: [ InventarioComponent ],
//       providers: [
//                   provideMockStore({ initialState }),
//                   { provide: MatDialog, useValue: {} }
//                  ]
//     }) 
//     .compileComponents();

//     store = TestBed.inject(MockStore);
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(InventarioComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('El componente inventario de riesgos "InventarioComponent" existe', () => {
//     expect(component).toBeTruthy();
//   });

//   it('La data se cargo', () => {
//     let dataSource = component.dataSource;
    
//     expect(dataSource.data?.length).toBeGreaterThan(0);
//   });

//   it('Debe retornar formulario válido si se ingresan todos los campos obligatorios', () => {
//     let codigo = component.riesgoFormGroup.controls['codigo'];
//     let nombre = component.riesgoFormGroup.controls['nombre'];
//     let responsable = component.riesgoFormGroup.controls['responsable'];
//     let factorRiesgo = component.riesgoFormGroup.controls['factorRiesgo'];
//     let frecuencia = component.riesgoFormGroup.controls['frecuencia'];
//     let impacto = component.riesgoFormGroup.controls['impacto'];
//     let tipoEvento = component.riesgoFormGroup.controls['tipoEvento'];
//     let tipoEvento2 = component.riesgoFormGroup.controls['tipoEvento2'];
//     let fuenteRiesgo = component.riesgoFormGroup.controls['fuenteRiesgo'];

//     codigo.setValue('R01');
//     nombre.setValue('Riesgo test');
//     responsable.setValue('1');
//     factorRiesgo.setValue('2');
//     frecuencia.setValue('3');
//     impacto.setValue('4');
//     tipoEvento.setValue('5');
//     tipoEvento2.setValue('6');
//     fuenteRiesgo.setValue('7');

//     expect(component.riesgoFormGroup.invalid).toBeFalse();
//   });

// });
