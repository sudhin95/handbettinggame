import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHomeResultComponent } from './landing-home-result.component';

describe('LandingHomeResultComponent', () => {
  let component: LandingHomeResultComponent;
  let fixture: ComponentFixture<LandingHomeResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingHomeResultComponent]
    });
    fixture = TestBed.createComponent(LandingHomeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
