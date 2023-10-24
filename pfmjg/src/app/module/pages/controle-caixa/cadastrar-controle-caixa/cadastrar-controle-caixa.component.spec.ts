import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarControleCaixaComponent } from './cadastrar-controle-caixa.component';

describe('CadastrarControleCaixaComponent', () => {
  let component: CadastrarControleCaixaComponent;
  let fixture: ComponentFixture<CadastrarControleCaixaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarControleCaixaComponent]
    });
    fixture = TestBed.createComponent(CadastrarControleCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
