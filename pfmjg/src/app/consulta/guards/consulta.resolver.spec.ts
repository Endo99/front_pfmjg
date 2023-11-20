import { TestBed } from '@angular/core/testing';

import { ConsultaResolver } from './consulta.resolver';

describe('ConsultaResolver', () => {
  let resolver: ConsultaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ConsultaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
