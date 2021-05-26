import { TestBed } from '@angular/core/testing';

import { LogModificacionesService } from './log-modificaciones.service';

describe('LogModificacionesService', () => {
  let service: LogModificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogModificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
