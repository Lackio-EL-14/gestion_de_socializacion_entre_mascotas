import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedHome } from './feed-home';

describe('FeedHome', () => {
  let component: FeedHome;
  let fixture: ComponentFixture<FeedHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedHome],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
