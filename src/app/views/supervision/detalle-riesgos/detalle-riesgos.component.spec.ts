import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRiesgosComponent } from './detalle-riesgos.component';

describe('DetalleRiesgosComponent', () => {
  let component: DetalleRiesgosComponent;
  let fixture: ComponentFixture<DetalleRiesgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleRiesgosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRiesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
