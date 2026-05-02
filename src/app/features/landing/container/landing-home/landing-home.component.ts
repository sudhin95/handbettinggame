import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LandingapiserviceService } from '../../service/landingapiservice.service';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent {

  constructor(
    private landingApi: LandingapiserviceService,
    private _router: Router,
    private _Activatedroute: ActivatedRoute,
    private modal: NzModalService
  ) {}

  ngOnInit():void{
    this.getListData();
  }

  getListData(): void {
 
    this.landingApi.getLandingList().subscribe({
      next: (dataResp: any) => {
        // localStorage.setItem('landingRem', JSON.stringify());
        if (dataResp.header.return_status == true) {
         
        } else {
          this.modal.error({
            nzTitle: 'Error',
            nzContent: dataResp.header.return_message,
          });
        }
      },
      error: (e) => {
        if (e.status == 401) {
          localStorage.removeItem('sessionId');
          localStorage.removeItem('userId');
          localStorage.removeItem('lytty_corporate_data');
          this._router.navigate(['/login']);
        } else {
          this.modal.error({
            nzTitle: 'Error',
            nzContent: e.error.header.return_message,
          });
        }
      },
      complete: () => {},
    });
  }

    topPlayers = [
    { name: 'Player 1', score: 120 },
    { name: 'Player 2', score: 110 },
    { name: 'Player 3', score: 95 },
    { name: 'Player 4', score: 80 },
    { name: 'Player 5', score: 70 }
  ];

}
