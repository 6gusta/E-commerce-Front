import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroIntem } from './cadastro-intem';

describe('CadastroIntem', () => {
  let component: CadastroIntem;
  let fixture: ComponentFixture<CadastroIntem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroIntem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroIntem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
