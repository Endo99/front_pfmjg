import { TestBed } from '@angular/core/testing';

import { NutricionistaResolver } from './nutricionista.resolver';

describe('NutricionistaResolver', () => {
  let resolver: NutricionistaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NutricionistaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
