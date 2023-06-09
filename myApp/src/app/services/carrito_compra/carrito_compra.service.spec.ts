import { TestBed } from '@angular/core/testing';

import { carritoCompraService } from './carrito_compra.service';

describe('carritoCompraService', () => {
  let service: carritoCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(carritoCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
