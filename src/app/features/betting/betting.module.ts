import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BettingRoutingModule } from './betting-routing.module';
import { BettingComponent } from './container/betting/betting.component';
import { NzButtonModule } from 'ng-zorro-antd/button';



@NgModule({
  declarations: [
    BettingComponent
  ],
  imports: [
    CommonModule,
    BettingRoutingModule,
    NzButtonModule
  ]
})
export class BettingModule { }
