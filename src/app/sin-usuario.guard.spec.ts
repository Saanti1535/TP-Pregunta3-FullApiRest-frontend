import { TestBed } from '@angular/core/testing';

import { SinUsuarioGuard } from './sin-usuario.guard';

describe('SinUsuarioGuard', () => {
  let guard: SinUsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SinUsuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
