import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  serviceUrl='http://dummy.restapiexample.com/api/v1/';

  constructor(public http: HttpClient) { }
  getDummyServices(param: string):Observable<any>{
    return this.http.get<any>(this.serviceUrl + param);
  }
}
