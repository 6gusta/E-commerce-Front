import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCliente } from './info-cliente';

describe('InfoCliente', () => {
  let component: InfoCliente;
  let fixture: ComponentFixture<InfoCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
