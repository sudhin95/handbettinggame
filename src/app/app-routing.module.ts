import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },

  {
    path: 'landing',
    loadChildren: () =>
      import('./features/landing/landing.module').then(m => m.LandingModule)
  },

  {
    path: 'game',
    loadChildren: () =>
      import('./features/game/game.module').then(m => m.GameModule)
  },

  {
    path: 'betting',
    loadChildren: () =>
      import('./features/betting/betting.module').then(m => m.BettingModule)
  },

  {
    path: 'leaderboard',
    loadChildren: () =>
      import('./features/leaderboard/leaderboard.module').then(m => m.LeaderboardModule)
  },

  {
    path: '**',
    redirectTo: 'landing'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
