import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Tests sobre componente "LoginComponent"', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  const initialState = { loggedIn: false };

  beforeEach(async () => {
      
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [ LoginComponent ],
      providers: [provideMockStore({ initialState })]
    }) 
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente "LoginComponent" existe', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar formulario inválido si solo se ingresa un campo', () => {
    let user = component.loginForm.controls['userName'];
    user.setValue('avargas');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('Debe retornar formulario válido si se ingresa usuario y password', () => {
    let user = component.loginForm.controls['userName'];
    let pass = component.loginForm.controls['clave'];

    user.setValue('avargas');
    pass.setValue('1234');
    
    expect(component.loginForm.invalid).toBeFalse();
  });

});
