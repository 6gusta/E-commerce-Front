import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Minhaconta } from './minhaconta';

describe('Minhaconta', () => {
  let component: Minhaconta;
  let fixture: ComponentFixture<Minhaconta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Minhaconta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Minhaconta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
