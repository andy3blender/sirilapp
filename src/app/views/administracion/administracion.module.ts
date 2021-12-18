import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//syncfusion components
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

//material components
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule  } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';

import { UsuarioComponent } from './usuario/usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { CrearEmpleadoComponent } from './empleado/crear-empleado/crear-empleado.component';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { StoreModule } from '@ngrx/store';
import { personaReducer } from '../../store/reducers/persona.reducers';
import { usuarioReducer } from '../../store/reducers/usuario.reducers';
import { perfilReducer } from '../../store/reducers/perfil.reducers';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearPerfilComponent } from './perfil/crear-perfil/crear-perfil.component';
import { permisoPerfilReducer } from '../../store/reducers/permisoPerfil.reducers';
import { permisosReducer } from '../../store/reducers/permiso.reducers';
import { CuentaComponent } from './cuenta/cuenta.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    CrearUsuarioComponent,
    EmpleadoComponent,
    CrearEmpleadoComponent,
    PerfilComponent,
    CrearPerfilComponent,
    CuentaComponent,    
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('persona', personaReducer), //como agregar mas reducers, agregar perfil
    StoreModule.forFeature('usuario', usuarioReducer),
    StoreModule.forFeature('perfil', perfilReducer),
    StoreModule.forFeature('permisoPerfil', permisoPerfilReducer),
    StoreModule.forFeature('permisos', permisosReducer),    
    ReactiveFormsModule,
    AdministracionRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,    
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,    
    MatTreeModule,
    // MatTabsModule,
    // MatGridListModule,
    // MatDividerModule,
    MatCardModule,
    // NgxMatFileInputModule,
    TreeViewModule
  ]
    
})
export class AdministracionModule { }
