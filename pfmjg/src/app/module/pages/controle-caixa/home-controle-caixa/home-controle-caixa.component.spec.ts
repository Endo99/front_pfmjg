import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeControleCaixaComponent } from './home-controle-caixa.component';

describe('HomeControleCaixaComponent', () => {
  let component: HomeControleCaixaComponent;
  let fixture: ComponentFixture<HomeControleCaixaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeControleCaixaComponent]
    });
    fixture = TestBed.createComponent(HomeControleCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
