import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../../models/login';
import { CookieService } from 'ngx-cookie-service'
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private cookies: CookieService) { }



  Login(userIn:any) : Observable<Login> {
    var local:string,production:string;    
    local = "/api/auth/login"
    production = "https://api-res-training-app.herokuapp.com/api/auth/login"
    const params = {
      "email"     : userIn.email,
      "password"  : userIn.password
    }
    return this.http.post<Login>(production,params);
  }

  setToken(token: string) {
    this.cookies.set("token", token );
  }
  
  getToken() {
    return this.cookies.get("token");
  }
  
  getUserLogged() {
    const token = this.getToken();
    return token;
  }

  isLoggedIn(){
    const cookieExists: boolean = this.cookies.check('token');
    return cookieExists
  }
  
  logout() {
    return this.cookies.delete("token");
  }



}
