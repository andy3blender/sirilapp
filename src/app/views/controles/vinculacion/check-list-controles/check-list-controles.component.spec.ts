import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListControlesComponent } from './check-list-controles.component';

describe('CheckListControlesComponent', () => {
  let component: CheckListControlesComponent;
  let fixture: ComponentFixture<CheckListControlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListControlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListControlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
