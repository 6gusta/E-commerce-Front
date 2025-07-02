import { TestBed } from '@angular/core/testing';

import { Produtoservice } from './produtoservice';

describe('Produtoservice', () => {
  let service: Produtoservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Produtoservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
