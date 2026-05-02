import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameapiserviceService {

  constructor(private http: HttpClient) { }

  
getAllTiles(): Observable<any> {
  const url = environment.apiUrl + environment.landingApiUrl;

  return this.http.get<any>(url);
}
}
