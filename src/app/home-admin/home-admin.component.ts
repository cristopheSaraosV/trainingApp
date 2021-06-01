import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private authApi: AuthService, public router: Router) { }


  youHavePermision: boolean = false;

  ngOnInit(): void {
    const token = this.authApi.getToken();
    if(token.length > 0){
      this.youHavePermision = true
    }

  }
  
  
  logout(){
    this.authApi.logout();
    this.youHavePermision = false
    this.router.navigateByUrl('/home/trainer')
  
  }
}
