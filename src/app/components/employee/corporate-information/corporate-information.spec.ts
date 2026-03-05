import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateInformation } from './corporate-information';

describe('CorporateInformation', () => {
  let component: CorporateInformation;
  let fixture: ComponentFixture<CorporateInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateInformation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
