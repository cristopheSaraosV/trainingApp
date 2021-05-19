import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  isHideLogin:boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  hide(){
    this.isHideLogin =true
  }

}
