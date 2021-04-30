import { Component, OnInit } from '@angular/core'
import * as parksJson from '../../assets/json/parks.json'
import { Park } from '../models/park'



@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css'],
})
export class ParksComponent implements OnInit {
  parksList: Array<Park> = (parksJson as any).default

  constructor() {}

  ngOnInit(): void {}
}
