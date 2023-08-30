import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAgendamentoComponent } from './home-agendamento.component';

describe('HomeAgendamentoComponent', () => {
  let component: HomeAgendamentoComponent;
  let fixture: ComponentFixture<HomeAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAgendamentoComponent]
    });
    fixture = TestBed.createComponent(HomeAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
