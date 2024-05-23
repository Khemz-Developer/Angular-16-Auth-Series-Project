import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(user:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`,user);
  }

  loginService(user:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`,user);
  }

  sendEmailService(email:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`,{email:email});
  }

  resetPasswordService(resetObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`,resetObj);
  }

  isLoggedIn(){
    return !!localStorage.getItem('user_id');
  }
}
