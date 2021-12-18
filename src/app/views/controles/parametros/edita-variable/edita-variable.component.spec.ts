import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaVariableComponent } from './edita-variable.component';

describe('EditaVariableComponent', () => {
  let component: EditaVariableComponent;
  let fixture: ComponentFixture<EditaVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaVariableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
