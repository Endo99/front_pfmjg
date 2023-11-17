import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConsultaComponent } from './home-consulta.component';

describe('HomeConsultaComponent', () => {
  let component: HomeConsultaComponent;
  let fixture: ComponentFixture<HomeConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
