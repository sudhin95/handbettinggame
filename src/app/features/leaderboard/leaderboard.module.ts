import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { LeaderboardHomeComponent } from './container/leaderboard-home/leaderboard-home.component';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    LeaderboardHomeComponent,
  ],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    NzButtonModule
  ]
})
export class LeaderboardModule { }
