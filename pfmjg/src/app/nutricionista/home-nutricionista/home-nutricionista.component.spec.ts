import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNutricionistaComponent } from './home-nutricionista.component';

describe('HomeNutricionistaComponent', () => {
  let component: HomeNutricionistaComponent;
  let fixture: ComponentFixture<HomeNutricionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeNutricionistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNutricionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
