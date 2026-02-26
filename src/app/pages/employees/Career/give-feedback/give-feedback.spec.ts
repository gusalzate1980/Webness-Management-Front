import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveFeedback } from './give-feedback';

describe('GiveFeedback', () => {
  let component: GiveFeedback;
  let fixture: ComponentFixture<GiveFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiveFeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveFeedback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
