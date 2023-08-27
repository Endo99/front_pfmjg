import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoriaComponent } from './home-categoria.component';

describe('HomeCategoriaComponent', () => {
  let component: HomeCategoriaComponent;
  let fixture: ComponentFixture<HomeCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCategoriaComponent]
    });
    fixture = TestBed.createComponent(HomeCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
