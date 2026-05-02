import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardHomeResultComponent } from './leaderboard-home-result.component';

describe('LeaderboardHomeResultComponent', () => {
  let component: LeaderboardHomeResultComponent;
  let fixture: ComponentFixture<LeaderboardHomeResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardHomeResultComponent]
    });
    fixture = TestBed.createComponent(LeaderboardHomeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
