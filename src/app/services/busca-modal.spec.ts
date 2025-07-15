import { TestBed } from '@angular/core/testing';

import { BuscaModal } from './busca-modal';

describe('BuscaModal', () => {
  let service: BuscaModal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaModal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
