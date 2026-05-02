import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingHomeComponent } from './container/landing-home/landing-home.component';
import { LandingHomeResultComponent } from './scenes/landing-home-result/landing-home-result.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';


@NgModule({
  declarations: [
    LandingHomeComponent,
    LandingHomeResultComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NzButtonModule,
    NzCardModule,
    NzModalModule
  ]
})
export class LandingModule { }
