import { Component } from '@angular/core';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent {
  currentScore = 1000;
  gameOver=false;
  finalScore=0;
  currentHandValue=0;
  currentHand=[];
  currentBet=0;
  handHistory:any;
  isNextHandRevealed=false;
    specialTileValues: Map<string, number> = new Map();


  exitToLanding(){

  }

  startNewGame(){

  }
  getTileIcon(tileValue: number): any {}


   getLatestHandWon(): boolean {
    return false;
   }
    getLatestHandResult(): string {
    if (this.handHistory.length > 0 && this.handHistory[0]) {
      return this.handHistory[0].result;
    }
    return '';
  }
    getTileDisplayValue(tile: any): number {
    // For display, show the current dynamic value
    if (tile.type === 'number') {
      return tile.value;
    } else {
      return this.specialTileValues.get(tile.name) || 5;
    }
  }
  
  getTileValueClass(value: number): string {
    if (value <= 2) return 'critical-low';
    if (value >= 8) return 'critical-high';
    return 'normal';
  }


}
