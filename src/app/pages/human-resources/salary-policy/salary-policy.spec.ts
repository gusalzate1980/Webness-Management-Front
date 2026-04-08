import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPolicy } from './salary-policy';

describe('SalaryPolicy', () => {
  let component: SalaryPolicy;
  let fixture: ComponentFixture<SalaryPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryPolicy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
