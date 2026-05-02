import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameBoardComponent } from './container/game-board/game-board.component';
import { GameBoardResultComponent } from './scenes/game-board-result/game-board-result.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms'; // Add this import



@NgModule({
  declarations: [
    GameBoardComponent,
    GameBoardResultComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    NzButtonModule,
    FormsModule // Add this to the imports array
  ],
  exports: [GameBoardComponent]

})
export class GameModule { }
