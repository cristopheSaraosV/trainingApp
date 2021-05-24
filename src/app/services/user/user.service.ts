import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';


@Injectable({
  providedIn: 'root'
})


export class UserService {
  
  public user: User = new User();
  constructor( private http: HttpClient ) { }

  getUsersAll() : Observable<User[]> {
    var local:string,production:string;    
    local = "/api/users"
    production = "https://api-res-training-app.herokuapp.com/api/users"
    return this.http.get<User[]>(production);
  }
}
