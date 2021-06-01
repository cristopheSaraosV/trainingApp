import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Roles } from '../models/roles';
import { UserService } from '../services/user/user.service';
import { RolesService } from '../services/roles/roles.service';
import { AuthService } from "../services/auth/auth.service";

import { FormControl, FormGroup } from "@angular/forms";


interface UserResponseI {
	status: boolean;
	msg: String;
}

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  userList: Array<User> = new Array<User>();
  roleslist: Array<Roles> = new Array<Roles>();
	isNew: Boolean = true;

  classError= '';
	hiddenMsg: boolean = true;

  constructor( private UserApi:UserService, private RolesApi:RolesService, public authService: AuthService ) { }
	userResponse: UserResponseI = {
		status: false,
		msg: "",
	};


  userFormGroup = new FormGroup({
		name: new FormControl(""),
    rol: new FormControl(""),
		password: new FormControl(""),
		email: new FormControl(""),
		state: new FormControl(false)
	});


  ngOnInit(): void {
    this.UserApi.getUsersAll().subscribe( (usersListApi:any) => {
      this.userList = usersListApi.users

    });

    this.RolesApi.getRolesAll().subscribe( (rolesListApi:any) => {
      this.roleslist = rolesListApi;
    })
  }

  selectedUser: User = {
		name: "",
		state:true,
		email: "",
		uid: "",
    rol:"",
    google:false,
    password:""
	};

  
  onSubmitNew(){

    const parksIn = {
      "name":this.userFormGroup.controls["name"].value,
      "state":this.userFormGroup.controls["state"].value,
      "email":this.userFormGroup.controls["email"].value,
      "password":this.userFormGroup.controls["password"].value,
      "google":false,
      "rol":this.userFormGroup.controls["rol"].value,
      "uid":''
    }
		const token = this.authService.getToken();

    this.UserApi.saveUser(parksIn,token).subscribe( (userRes:any) => {

    },(errorCather:any) => {
      if (errorCather.error.msg == "Access Token is required") {
        this.userResponse.msg = errorCather.error.msg;
        this.classError = "alert alert-danger";
        this.hiddenMsg = false;
      } else {
        errorCather.error.errors.map((item: any) => {
          this.hiddenMsg = false;

          this.userResponse.msg += item.msg + " || ";
          this.userResponse.status = false;
          this.classError = "alert alert-danger";

          setTimeout(() => {
            this.userResponse.msg = "";
            this.classError = "";
            this.hiddenMsg = true;
          }, 5000);

        });
      }    })


  }

  clearForm(){
    this.userFormGroup.controls["name"].setValue('');
    this.userFormGroup.controls["state"].setValue('');
    this.userFormGroup.controls["email"].setValue('');
    this.userFormGroup.controls["rol"].setValue('');
    this.userFormGroup.controls["state"].setValue(false);
    this.userFormGroup.controls["password"].setValue('');
  }

  editExercise(exerciseIn: any, id: string) {
    
		this.isNew = false;
    
    this.selectedUser.name   = exerciseIn.name
    this.selectedUser.state  = exerciseIn.state
    this.selectedUser.email  = exerciseIn.email
    this.selectedUser.uid    = exerciseIn.uid
    this.selectedUser.rol    = exerciseIn.rol
    this.selectedUser.password    = exerciseIn.password

	}
  newExercise() {
		this.isNew = true;
    this.clearForm()
	}

 

}
