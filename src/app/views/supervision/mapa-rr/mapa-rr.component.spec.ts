import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaRRComponent } from './mapa-rr.component';

describe('MapaRRComponent', () => {
  let component: MapaRRComponent;
  let fixture: ComponentFixture<MapaRRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaRRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaRRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
