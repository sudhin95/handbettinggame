import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardResultComponent } from './game-board-result.component';

describe('GameBoardResultComponent', () => {
  let component: GameBoardResultComponent;
  let fixture: ComponentFixture<GameBoardResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameBoardResultComponent]
    });
    fixture = TestBed.createComponent(GameBoardResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
