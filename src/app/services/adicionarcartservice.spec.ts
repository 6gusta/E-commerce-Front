import { TestBed } from '@angular/core/testing';

import { AdicionarCartService } from './adicionar-cart-service';

describe('AdicionarCartService', () => {
  let service: AdicionarCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdicionarCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
