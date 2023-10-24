import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarControleCaixaComponent } from './editar-controle-caixa.component';

describe('EditarControleCaixaComponent', () => {
  let component: EditarControleCaixaComponent;
  let fixture: ComponentFixture<EditarControleCaixaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarControleCaixaComponent]
    });
    fixture = TestBed.createComponent(EditarControleCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
