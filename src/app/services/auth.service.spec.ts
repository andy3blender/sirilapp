import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

describe('Tests sobre servicio "AuthService"', () => {
  let service: AuthService;
  let httpClientSpy: { get: jasmine.Spy };
  let store: MockStore;
  const initialState = { loggedIn: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })]
    });
    store = TestBed.inject(MockStore);

    httpClientSpy = jasmine.createSpyObj('HttpClient',['get']);
    //service = TestBed.inject(AuthService);
    service = new AuthService(httpClientSpy as any, store as any);
  });

  it('Debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Función Login con credenciales correctas retorna un objeto de usuario', (done: DoneFn) => {
    const mockResultLogin = [{
      "identificacion": "1234567890",
      "nombres": "Andres Ricardo",
      "apellidos": "Vargas",
      "email": "andy3blender@gmail.com",
      "fechaNacimiento": "1987-02-09",
      "estado": "V",
      "usuarioId": 1,
      "login": "avargas",
      "clave": "1234",
      "perfilId": 1,
      "nombrePerfil": "Administrador",
      "activo": true,
      "fotoUrl": null
    }]

    const usuario = 'avargas';
    const pass = '1234';

    httpClientSpy.get.and.returnValue(of(mockResultLogin));

    service.login2(usuario,pass).subscribe(res => {
      expect(res.login).toEqual(usuario); 
      done();
    });
    
  });

  it('Función Login con credenciales incorrectas retorna un error', (done: DoneFn) => {
    const mockResultLogin = [{
      "identificacion": "1234567890",
      "nombres": "Andres Ricardo",
      "apellidos": "Vargas",
      "email": "andy3blender@gmail.com",
      "fechaNacimiento": "1987-02-09",
      "estado": "V",
      "usuarioId": 1,
      "login": "avargas",
      "clave": "1234",
      "perfilId": 1,
      "nombrePerfil": "Administrador",
      "activo": true,
      "fotoUrl": null
    }]

    const usuario = 'avargas22';
    const pass = '1234';

    httpClientSpy.get.and.returnValue(throwError('Usuario o password inválidos'));

    service.login2(usuario,pass).subscribe(res => {
      
    }, 
    error => {
      expect(error).toEqual('Usuario o password inválidos'); 
      done();
    }
    );
    
  });


});
