import { TestBed } from '@angular/core/testing';

import { AgendaResolver } from './agenda.resolver';

describe('AgendaResolver', () => {
  let resolver: AgendaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AgendaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
