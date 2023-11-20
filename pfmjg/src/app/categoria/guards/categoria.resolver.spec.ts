import { TestBed } from '@angular/core/testing';

import { CategoriaResolver } from './categoria.resolver';

describe('CategoriaResolver', () => {
  let resolver: CategoriaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoriaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
