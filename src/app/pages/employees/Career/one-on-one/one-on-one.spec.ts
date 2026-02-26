import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOnOne } from './one-on-one';

describe('OneOnOne', () => {
  let component: OneOnOne;
  let fixture: ComponentFixture<OneOnOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneOnOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneOnOne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
