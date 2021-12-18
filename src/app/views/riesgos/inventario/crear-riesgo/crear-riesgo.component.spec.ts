import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRiesgoComponent } from './crear-riesgo.component';

describe('CrearRiesgoComponent', () => {
  let component: CrearRiesgoComponent;
  let fixture: ComponentFixture<CrearRiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
