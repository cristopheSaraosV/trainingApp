import { Component, OnInit } from '@angular/core'
import * as exercisesJson from '../../assets/json/exercises.json'

interface Exercise {
  name: string
  description: string
  id: number,
  url: string
}

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  exercisesList: Array<Exercise> = (exercisesJson as any).default

  constructor() {}

  ngOnInit(): void {
    console.log(exercisesJson)
  }


  public goUp(){
    window.scrollTo(0,0);

  }
  
}
