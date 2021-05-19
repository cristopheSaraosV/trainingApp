import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise'
import { ExerciseService } from '../services/exercise/exercise.service';

@Component({
  selector: 'app-exercises-admin',
  templateUrl: './exercises-admin.component.html',
  styleUrls: ['./exercises-admin.component.css']
})
export class ExercisesAdminComponent implements OnInit {

  exercisesList: Array<Exercise> = new Array<Exercise>();

  constructor(private ExerciseApi: ExerciseService) { }

  ngOnInit(): void {
    this.ExerciseApi.getExerciseAll().subscribe((exerciseListApi)=>{
      this.exercisesList = exerciseListApi;
    })
  }

}
