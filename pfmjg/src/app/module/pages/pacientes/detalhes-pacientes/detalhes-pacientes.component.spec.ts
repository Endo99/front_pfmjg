import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPacientesComponent } from './detalhes-pacientes.component';

describe('DetalhesPacientesComponent', () => {
  let component: DetalhesPacientesComponent;
  let fixture: ComponentFixture<DetalhesPacientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesPacientesComponent]
    });
    fixture = TestBed.createComponent(DetalhesPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
