import { Component, OnInit } from '@angular/core'
import { Park } from '../models/park'
import { ParkService } from '../services/park/park.service'



@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css'],
})
export class ParksComponent implements OnInit  {

  parksList: Array<Park> = new Array<Park>();

  constructor( private ParkApi: ParkService ) {}

  ngOnInit(): void {
    
    this.ParkApi.getParkAll().subscribe( (parksListApi) =>{
      this.parksList = parksListApi
    })

  }
}

