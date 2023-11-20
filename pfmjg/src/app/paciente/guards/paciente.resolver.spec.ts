import { TestBed } from '@angular/core/testing';

import { PacienteResolver } from './paciente.resolver';

describe('PacienteResolver', () => {
  let resolver: PacienteResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PacienteResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
