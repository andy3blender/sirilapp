import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { RiesgoService } from './riesgo.service';

describe('Tests sobre servicio "RiesgoService"', () => {
  let service: RiesgoService;
  let httpClientSpy: { get: jasmine.Spy };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  
    httpClientSpy = jasmine.createSpyObj('HttpClient',['get']);
    service = new RiesgoService(httpClientSpy as any);
  });

  it('Debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Función GetRiesgos retorna un objeto de Riesgo', (done: DoneFn) => {
    const mockResultLogin = [{
        "riesgoId": 1,
        "procesoId": 10,
        "codigo": "PR-TAL-05-RG2",
        "nombre": "No actualizar carpetas de empleados anualmente",
        "descripcion": "No actualizar carpetas de empleados anualmente",
        "responsable": "20",
        "factorRiesgo": "3",
        "frecuencia": 5,
        "impacto": 4,
        "tipoEvento": "5",
        "tipoEvento2": "9",
        "fuenteRiesgo": "3",
        "estado": "V",
        "riesgoInherente": 20.00,
        "frecuenciaResidual": 5,
        "impactoResidual": 2,
        "riesgoResidual": 10.00,
        "subprocesoId": 9,
        "nombreSubproceso": "Deposito en efectivo",
        "nombreActividad": "Deposito en efectivo realizado",
        "nombreRI": "CRITICO",
        "nombreRR": "MEDIO"
    }]

    httpClientSpy.get.and.returnValue(of(mockResultLogin));

    service.getRiesgos().subscribe(res => {
      expect(res[0]).toEqual(mockResultLogin[0]); 
      done();
    });
    
  });

});
