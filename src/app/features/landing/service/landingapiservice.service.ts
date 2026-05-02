import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LandingapiserviceService {

  constructor(private http: HttpClient) { }

  // getLandingList(): Observable<Array<any>> {
  //   console.log("gggggggggggggg")
  //   const postUrl = environment.apiUrl + environment.landingApiUrl + '/list';
  //   let httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer `
  //   });
  //   return this.http.get<Array<any>>(postUrl, { headers: httpHeaders });
  // }

//   getLandingList(): Observable<any> {
//   const url = environment.apiUrl + environment.landingApiUrl;

//   return this.http.get<any>(url);
// }

}
