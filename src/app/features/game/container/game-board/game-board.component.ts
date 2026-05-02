import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface Tile {
  id: string;
  type: 'number' | 'wind' | 'dragon';
  name: string;
  suit?: string;
  value: number;
}

interface HandHistory {
  tiles: Tile[];
  totalValue: number;
  bet: string;
  result: string;
  tilesDisplay: string;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  // Game State
  gameOver = false;
  currentScore = 1000;
  
  // Deck
  drawPile: Tile[] = [];
  discardPile: Tile[] = [];
  reshuffleCount = 0;
  
  // Hands
  currentHand: Tile[] = [];
  currentHandValue = 0;
  nextHand: Tile[] = [];
  nextHandValue = 0;
  
  // Betting
  currentBet: string | null = null;
  betAmount = 100;
  showNextHand = false;
  canBet = true;
  roundResult: string | null = null;
  
  // History
  handHistory: HandHistory[] = [];
  
  // Leaderboard
  showLeaderboard = false;
  leaderboard: LeaderboardEntry[] = [];
  playerName = '';
  showSaveDialog = false;
  
  // Tile Values (for special tiles)
  tileValues: Record<string, number> = {
    'East': 5, 'South': 5, 'West': 5, 'North': 5,
    'Red': 5, 'Green': 5, 'White': 5
  };
  
  private readonly WINDS = ['East', 'South', 'West', 'North'];
  private readonly DRAGONS = ['Red', 'Green', 'White'];
  
  constructor(private http: HttpClient,private router: Router) {}
  
  ngOnInit() {
    this.startNewGame();
    this.loadLeaderboard();
  }
  
  startNewGame() {
    this.gameOver = false;
    this.currentScore = 1000;
    this.reshuffleCount = 0;
    this.handHistory = [];
    this.currentBet = null;
    this.showNextHand = false;
    this.canBet = true;
    this.roundResult = null;
    this.showSaveDialog = false;
    
    // Reset tile values
    Object.keys(this.tileValues).forEach(key => {
      this.tileValues[key] = 5;
    });
    
    // Create and shuffle deck
    this.drawPile = this.shuffleArray(this.generateDeck());
    this.discardPile = [];

    console.log(",dsfs", this.drawPile);
    
    // Deal initial hands
    this.dealHands();
  }
  
  generateDeck(): Tile[] {
    const deck: Tile[] = [];
    
    // Number tiles (1-9) - add 2 copies each for better gameplay
    for (let i = 1; i <= 9; i++) {
      for (let copy = 0; copy < 1; copy++) {
        deck.push({
          id: `num-${i}-${copy}`,
          type: 'number',
          name: i.toString(),
          value: i
        });
      }
    }
    
    // Wind tiles
    this.WINDS.forEach(wind => {
      for (let copy = 0; copy < 1; copy++) {
        deck.push({
          id: `wind-${wind}-${copy}`,
          type: 'wind',
          name: wind,
          value: this.tileValues[wind]
        });
      }
    });
    
    // Dragon tiles
    this.DRAGONS.forEach(dragon => {
      for (let copy = 0; copy < 1; copy++) {
        deck.push({
          id: `dragon-${dragon}-${copy}`,
          type: 'dragon',
          name: dragon,
          value: this.tileValues[dragon]
        });
      }
    });
    
    return deck;
  }
  
  dealHands() {
    // Draw current hand
    if (this.drawPile.length < 3) this.reshuffle();
    this.currentHand = this.drawPile.splice(0, 3);
    this.currentHandValue = this.calculateValue(this.currentHand);
    
    // Draw next hand
    if (this.drawPile.length < 3) this.reshuffle();
    this.nextHand = this.drawPile.splice(0, 3);
    this.nextHandValue = this.calculateValue(this.nextHand);
    this.showNextHand = false;
  }
  
  calculateValue(hand: Tile[]): number {
    return hand.reduce((sum, tile) => {
      if (tile.type === 'number') return sum + tile.value;
      return sum + this.tileValues[tile.name];
    }, 0);
  }
  
  placeBet(type: string) {
    if (!this.canBet || this.gameOver || this.betAmount > this.currentScore) return;
    
    this.currentBet = type;
    this.canBet = false;
    this.showNextHand = true;
    
    setTimeout(() => this.determineWinner(), 1500);
  }
  
  determineWinner() {
    let won = false;
    
    if (this.currentBet === 'HIGHER') {
      won = this.nextHandValue > this.currentHandValue;
    } else if (this.currentBet === 'LOWER') {
      won = this.nextHandValue < this.currentHandValue;
    }
    
    this.roundResult = won ? 'WIN' : 'LOSE';
    
    // Update score
    if (won) {
      this.currentScore += this.betAmount;
    } else {
      this.currentScore -= this.betAmount;
    }
    
    // Update special tile values (based on CURRENT hand)
    this.updateTileValues(this.currentHand, won);
    
    // Create display string for history
    const tilesDisplay = this.currentHand.map(t => this.getTileIcon(t)).join(' ');
    
    // Save to history
    this.handHistory.unshift({
      tiles: [...this.currentHand],
      totalValue: this.currentHandValue,
      bet: this.currentBet || '',
      result: this.roundResult,
      tilesDisplay: tilesDisplay
    });
    
    if (this.handHistory.length > 5) this.handHistory.pop();
    
    // Check game over
    this.checkGameOver();
    
    if (!this.gameOver) {
      // Wait for result to be visible before next round
      setTimeout(() => {
        this.nextRound();
      }, 2000);
    }
  }
  
  updateTileValues(hand: Tile[], won: boolean) {
    hand.forEach(tile => {
      if (tile.type !== 'number') {
        const oldValue = this.tileValues[tile.name];
        let newValue = won ? oldValue + 1 : oldValue - 1;
        newValue = Math.max(0, Math.min(10, newValue));
        this.tileValues[tile.name] = newValue;
      }
    });
  }
  
  nextRound() {
    // Move current hand to discard
    this.discardPile.push(...this.currentHand);
    
    // Current hand becomes next hand
    this.currentHand = [...this.nextHand];
    this.currentHandValue = this.calculateValue(this.currentHand);
    
    // Draw new next hand
    if (this.drawPile.length < 3) this.reshuffle();
    if (this.drawPile.length >= 3) {
      this.nextHand = this.drawPile.splice(0, 3);
      this.nextHandValue = this.calculateValue(this.nextHand);
    } else {
      this.gameOver = true;
      this.showSaveDialog = true;
      return;
    }
    
    // Reset for next round
    this.currentBet = null;
    this.showNextHand = false;
    this.canBet = true;
    this.roundResult = null;
  }
  
  // reshuffle() {
  //   if (this.reshuffleCount >= 3) return;
    
  //   this.reshuffleCount++;
  //   const allTiles = [...this.drawPile, ...this.discardPile];
  //   const freshTiles = this.generateDeck();
  //   const combined = [...allTiles, ...freshTiles];
  //   this.drawPile = this.shuffleArray(combined);
  //   this.discardPile = [];
  // }

  reshuffle() {
  if (this.reshuffleCount >= 3) return;
  
  this.reshuffleCount++;
  
  // Only use discard pile to create new draw pile
  // The discard pile contains all tiles that have been played
  if (this.discardPile.length === 0) {
    console.log('No tiles to reshuffle!');
    return;
  }
  
  // Take all tiles from discard pile
  const allTiles = [...this.discardPile];
  
  // Shuffle them to create new draw pile
  this.drawPile = this.shuffleArray(allTiles);
  
  // Clear discard pile
  this.discardPile = [];
  
  console.log(`Reshuffled deck! (${this.reshuffleCount}/3) New draw pile size: ${this.drawPile.length}`);
}
  
  checkGameOver() {
    // Check tile values
    for (const [name, value] of Object.entries(this.tileValues)) {
      if (value === 0 || value === 10) {
        this.gameOver = true;
        this.showSaveDialog = true;
        return;
      }
    }
    
    // Check reshuffles
    if (this.reshuffleCount >= 3 && this.drawPile.length < 3) {
      this.gameOver = true;
      this.showSaveDialog = true;
      return;
    }
    
    // Check money
    if (this.currentScore <= 0) {
      this.gameOver = true;
      this.showSaveDialog = true;
    }
  }
  
  saveScore() {
    if (!this.playerName.trim()) {
      alert('Please enter your name');
      return;
    }
    
    const newEntry: LeaderboardEntry = {
      name: this.playerName,
      score: this.currentScore,
      date: new Date().toLocaleString()
    };
    
    this.leaderboard.push(newEntry);
    this.leaderboard.sort((a, b) => b.score - a.score);
    this.leaderboard = this.leaderboard.slice(0, 10);
    
    this.saveLeaderboardToFile();
    this.saveToLocalStorage();
    
    this.showSaveDialog = false;
    this.playerName = '';
    this.startNewGame();
  }
  
  saveLeaderboardToFile() {
    const data = JSON.stringify(this.leaderboard, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  loadLeaderboard() {
    const saved = localStorage.getItem('mahjong_leaderboard');
    if (saved) {
      this.leaderboard = JSON.parse(saved);
    } else {
      this.http.get<LeaderboardEntry[]>('/assets/leaderboard.json')
        .subscribe({
          next: (data) => {
            this.leaderboard = data;
            this.saveToLocalStorage();
          },
          error: () => {
            this.leaderboard = [];
          }
        });
    }
  }
  
  saveToLocalStorage() {
    localStorage.setItem('mahjong_leaderboard', JSON.stringify(this.leaderboard));
  }
  
  toggleLeaderboard() {
    this.showLeaderboard = !this.showLeaderboard;
  }
  
  shuffleArray(arr: any[]): any[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  // Helper methods for template
  getTileIcon(tile: Tile): string {
    if (tile.type === 'number') return '🎴';
    if (tile.type === 'wind') return '💨';
    return '🐉';
  }
  
  getTileValue(tile: Tile): number {
    if (tile.type === 'number') return tile.value;
    return this.tileValues[tile.name];
  }
  
  getValueClass(value: number): string {
    if (value <= 2) return 'critical-low';
    if (value >= 8) return 'critical-high';
    return 'normal';
  }
  
  decreaseBet() {
    this.betAmount = Math.max(10, this.betAmount - 50);
  }
  
  increaseBet() {
    this.betAmount = Math.min(this.currentScore, this.betAmount + 50);
  }
  
  updateBetAmount(event: Event) {
    const input = event.target as HTMLInputElement;
    let num = parseInt(input.value) || 10;
    this.betAmount = Math.max(10, Math.min(this.currentScore, num));
  }
  
  exitToLanding() {
        this.router.navigate(['/landing']);

    // this.startNewGame();
  }
}