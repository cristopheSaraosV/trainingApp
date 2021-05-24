import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  userList: Array<User> = new Array<User>();

  constructor( private UserApi:UserService ) { }

  ngOnInit(): void {
    this.UserApi.getUsersAll().subscribe( (usersListApi:any) => {
      this.userList = usersListApi.users

    })
  }

}
