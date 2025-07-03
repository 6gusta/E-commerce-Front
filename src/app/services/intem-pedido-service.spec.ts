import { TestBed } from '@angular/core/testing';

import { IntemPedidoService } from './intem-pedido-service';

describe('IntemPedidoService', () => {
  let service: IntemPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntemPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
