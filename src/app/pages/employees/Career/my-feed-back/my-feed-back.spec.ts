import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeedBack } from './my-feed-back';

describe('MyFeedBack', () => {
  let component: MyFeedBack;
  let fixture: ComponentFixture<MyFeedBack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFeedBack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFeedBack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
