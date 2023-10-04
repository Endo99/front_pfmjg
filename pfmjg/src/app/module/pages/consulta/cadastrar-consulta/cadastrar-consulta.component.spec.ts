import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarConsultaComponent } from './cadastrar-consulta.component';

describe('CadastrarConsultaComponent', () => {
  let component: CadastrarConsultaComponent;
  let fixture: ComponentFixture<CadastrarConsultaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarConsultaComponent]
    });
    fixture = TestBed.createComponent(CadastrarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
