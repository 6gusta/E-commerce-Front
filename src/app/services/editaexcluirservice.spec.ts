import { TestBed } from '@angular/core/testing';

import { Editaexcluirservice } from './editaexcluirservice';

describe('Editaexcluirservice', () => {
  let service: Editaexcluirservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Editaexcluirservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
