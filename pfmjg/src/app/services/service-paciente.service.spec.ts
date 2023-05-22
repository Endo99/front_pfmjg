import { TestBed } from '@angular/core/testing';

import { ServicePacienteService } from './service-paciente.service';

describe('ServicePacienteService', () => {
  let service: ServicePacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
