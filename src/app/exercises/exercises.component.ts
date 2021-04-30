import { Component, OnInit } from '@angular/core'
import * as exercisesJson from '../../assets/json/exercises.json'
import { Exercise } from '../models/exercise'

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  exercisesList: Array<Exercise> = (exercisesJson as any).default

  constructor() {}

  ngOnInit(): void {
  }


  public goUp(){
    window.scrollTo(0,0);

  }
  
}
