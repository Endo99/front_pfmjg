import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePacienteComponent } from './home-paciente.component';

describe('HomePacienteComponent', () => {
  let component: HomePacienteComponent;
  let fixture: ComponentFixture<HomePacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePacienteComponent]
    });
    fixture = TestBed.createComponent(HomePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
