import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private authApi: AuthService, public router: Router) { }

  isValid:boolean = true;
  
  userFormGroup = new FormGroup({
		email: new FormControl(""),
		password: new FormControl(""),
	});

  ngOnInit(): void { }

  
  onSubmitNew(){

    const UserIn = {
      email: this.userFormGroup.controls["email"].value,
      password : this.userFormGroup.controls["password"].value,
    }

    this.authApi.Login(UserIn).subscribe((loginRes:any)=>{
      this.authApi.setToken(loginRes.token);
      this.router.navigateByUrl('/home-admin/exercises');
      this.isValid = true;
    }, (error) => {
      this.isValid = false;

    })


}




}
