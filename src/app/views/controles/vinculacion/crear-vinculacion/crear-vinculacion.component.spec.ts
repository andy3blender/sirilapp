import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVinculacionComponent } from './crear-vinculacion.component';

describe('CrearVinculacionComponent', () => {
  let component: CrearVinculacionComponent;
  let fixture: ComponentFixture<CrearVinculacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearVinculacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVinculacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
