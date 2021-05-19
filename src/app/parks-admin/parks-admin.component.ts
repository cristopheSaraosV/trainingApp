import { Component, OnInit } from '@angular/core';
import { Park } from '../models/park';
import { ParkService } from '../services/park/park.service'

@Component({
  selector: 'app-parks-admin',
  templateUrl: './parks-admin.component.html',
  styleUrls: ['./parks-admin.component.css']
})
export class ParksAdminComponent implements OnInit {

  parksList: Array<Park> = new Array<Park>();

  constructor(private ParksApi: ParkService) { }

  ngOnInit(): void {
    this.ParksApi.getParkAll().subscribe((parksListApi)=>{
      this.parksList = parksListApi;
    })
  }

}
