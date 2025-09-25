import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthModuleService {

  public httpOption: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response'
  };

  API_PATH = environment.apiPath;

  constructor(
    private http: HttpClient
  ) { }

  // User login
  userLogin(body: any) {
    return this.http.post(`${this.API_PATH}api/v1/users/login`, body, this.httpOption);
  }

  // User signup
  userSignUp(body: any) {
    return this.http.post(`${this.API_PATH}api/v1/users/register`, body, this.httpOption);
  }
}
