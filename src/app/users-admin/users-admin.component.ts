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

  userList:  Array<User>   = new Array<User>();
  roleslist: Array<Roles>  = new Array<Roles>();
	isNew: Boolean = true;

  classError= '';
	hiddenMsg: boolean = true;

  constructor( private UserApi:UserService, private RolesApi:RolesService, public authService: AuthService ) { }

	userResponse: UserResponseI = {
		status  : false,
		msg     : "",
	};


  userFormGroup = new FormGroup({
		name      : new FormControl(""),
    rol       : new FormControl(""),
		password  : new FormControl(""),
		email     : new FormControl(""),
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
		name      : "",
		email     : "",
		uid       : "",
    rol       :"",
    google    :false,
    password  :""
	};

  
  onSubmitNew(){

    const usersIn = {
      "name"      :this.userFormGroup.controls["name"].value,
      "email"     :this.userFormGroup.controls["email"].value,
      "password"  :this.userFormGroup.controls["password"].value,
      "google"    :false,
      "rol"       :this.userFormGroup.controls["rol"].value,
      "uid"       :''
    }

 
		const token = this.authService.getToken();

    this.UserApi.saveUser(usersIn,token).subscribe( (userRes:any) => {
      
      if(userRes){
        this.userResponse.status = true;
        this.userResponse.msg = "Saved correctly";
        this.classError = "alert alert-success";
  
        this.hiddenMsg = false;
      }

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


  onSubmitEdit(){

    
  }
  
  
  
  editUser(exerciseIn: any, id: string) {
    
    this.isNew = false;    
    this.selectedUser.name   = exerciseIn.name;
    this.selectedUser.email  = exerciseIn.email;
    this.selectedUser.uid    = exerciseIn.uid;
    this.selectedUser.rol    = exerciseIn.rol;
    this.selectedUser.password    = exerciseIn.password;
    
	}
  deleteUser(exerciseIn: any, id: string) {
    
    this.selectedUser.uid    = exerciseIn.uid;
    this.selectedUser.name   = exerciseIn.name;
    this.selectedUser.email  = exerciseIn.email;
    this.selectedUser.rol    = exerciseIn.rol;
    
    
	}
  
  onSubmitDelete(){

    const userID = this.selectedUser.uid
    const token = this.authService.getToken();

		this.UserApi.deleteUser(userID, token).subscribe(
			(userRes: any) => {
				if (userRes.status) {
					this.userResponse.status = true;
					this.userResponse.msg = userRes.msg;
					this.classError = "";
					setTimeout(() => {
						this.userResponse.msg = "";
						this.classError = "";
					}, 3000);
				}
        
			},
			(errorCather: any) => {
        if (errorCather.error.msg == "Access Token is required") {
          this.userResponse.msg = errorCather.error.msg;
          this.classError = "alert alert-danger";
				} else {
					errorCather.error.errors.map((item: any) => {
						this.hiddenMsg = false;

						this.userResponse.msg += item.msg + " || ";
						this.userResponse.status = false;
						this.classError = "alert alert-danger";

					});
				}
        setTimeout(() => {
          this.userResponse.msg = "";
          this.classError = "";
        }, 3000);
			}
		);
  }
  
  clearForm(){
    this.userFormGroup.controls["name"].setValue('');
    this.userFormGroup.controls["email"].setValue('');
    this.userFormGroup.controls["rol"].setValue('');
    this.userFormGroup.controls["password"].setValue('');
  }
  

  newExercise() {
		this.isNew = true;
    this.clearForm()
	}

 

}
