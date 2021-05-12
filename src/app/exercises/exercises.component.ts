import { Component, OnInit } from '@angular/core'
// import * as exercisesJson from '../../assets/json/exercises.json'
import { Exercise } from '../models/exercise'
import { ExerciseService } from '../services/exercise/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  // exercisesList: Array<Exercise> = (exercisesJson as any).default
  exercisesList: Array<Exercise> = new Array<Exercise>();

  constructor(private ExerciseApi: ExerciseService) {}

  ngOnInit(): void {
    this.ExerciseApi.getExerciseAll().subscribe((exerciseListApi)=>{
      this.exercisesList = exerciseListApi;
    })
  }


  public goUp(){
    window.scrollTo(0,0);

  }
  
}
