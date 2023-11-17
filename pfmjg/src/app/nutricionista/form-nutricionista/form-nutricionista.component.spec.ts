import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNutricionistaComponent } from './form-nutricionista.component';

describe('FormNutricionistaComponent', () => {
  let component: FormNutricionistaComponent;
  let fixture: ComponentFixture<FormNutricionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNutricionistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNutricionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
