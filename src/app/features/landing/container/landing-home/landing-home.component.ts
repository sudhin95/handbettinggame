import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LandingapiserviceService } from '../../service/landingapiservice.service';
import { HttpClient } from '@angular/common/http';

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent implements OnInit {

  topPlayers: LeaderboardEntry[] = [];
  isLoading = false;

  constructor(
    private landingApi: LandingapiserviceService,
    private _router: Router,
    private _Activatedroute: ActivatedRoute,
    private modal: NzModalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getListData();
    this.loadLeaderboard();
  }

  getListData() {
    // Your existing API call can go here
    console.log('Loading landing page data...');
  }

  loadLeaderboard() {
    this.isLoading = true;
    
    // First try to load from localStorage
    const saved = localStorage.getItem('mahjong_leaderboard');
    
    if (saved) {
      // Load from localStorage
      this.topPlayers = JSON.parse(saved);
      // Sort by score (highest first) and take top 5
      this.topPlayers.sort((a, b) => b.score - a.score);
      this.topPlayers = this.topPlayers.slice(0, 5);
      this.isLoading = false;
      console.log('Leaderboard loaded from localStorage:', this.topPlayers);
    } else {
      // If not in localStorage, try to load from assets JSON file
      this.http.get<LeaderboardEntry[]>('/assets/leaderboard.json')
        .subscribe({
          next: (data) => {
            this.topPlayers = data;
            // Sort by score (highest first) and take top 5
            this.topPlayers.sort((a, b) => b.score - a.score);
            this.topPlayers = this.topPlayers.slice(0, 5);
            this.saveToLocalStorage();
            this.isLoading = false;
            console.log('Leaderboard loaded from JSON file:', this.topPlayers);
          },
          error: (error) => {
            console.log('No existing leaderboard file, using empty list');
            this.topPlayers = [];
            this.isLoading = false;
          }
        });
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('mahjong_leaderboard', JSON.stringify(this.topPlayers));
  }

  refreshLeaderboard() {
    this.loadLeaderboard();
  }

  getHighestScore(): number {
    if (this.topPlayers.length === 0) return 0;
    return this.topPlayers[0].score;
  }

  getTotalPlayers(): number {
    const saved = localStorage.getItem('mahjong_leaderboard');
    if (saved) {
      const allPlayers = JSON.parse(saved);
      return allPlayers.length;
    }
    return 0;
  }
}