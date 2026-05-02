import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BettingComponent } from './container/betting/betting.component';

const routes: Routes = [
  {
      path: '',
      component: BettingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BettingRoutingModule { }
