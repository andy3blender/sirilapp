import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaFactorComponent } from './edita-factor.component';

describe('EditaFactorComponent', () => {
  let component: EditaFactorComponent;
  let fixture: ComponentFixture<EditaFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaFactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
