import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Roles } from '../models/roles';
import { UserService } from '../services/user/user.service';
import { RolesService } from '../services/roles/roles.service';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  userList: Array<User> = new Array<User>();
  roleslist: Array<Roles> = new Array<Roles>();


  constructor( private UserApi:UserService, private RolesApi:RolesService ) { }



  userFormGroup = new FormGroup({
		name: new FormControl(""),
		rol: new FormControl(""),
		password: new FormControl(""),
		email: new FormControl("")
	});


  ngOnInit(): void {
    this.UserApi.getUsersAll().subscribe( (usersListApi:any) => {
      this.userList = usersListApi.users

    });

    this.RolesApi.getRolesAll().subscribe( (rolesListApi:any) => {
      this.roleslist = rolesListApi;
    })
  }

  onSubmitNew(){
    const UserIn = {
      name:       this.userFormGroup.controls["name"].value,
      rol :       this.userFormGroup.controls["rol"].value,
      password :  this.userFormGroup.controls["password"].value,
      email :     this.userFormGroup.controls["email"].value,
	    google: false,
	    state: true,
	    uid: ''
    }

    this.UserApi.saveUser(UserIn).subscribe((userRes:any) => {

    })

 }

}
