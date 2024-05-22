import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  registerService(user:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`,user);
  }

  loginService(user:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`,user);
  }
}
