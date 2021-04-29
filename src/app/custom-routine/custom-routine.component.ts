import { Component, OnInit } from '@angular/core'
import * as exercisesJson from '../../assets/json/exercises.json'
import { FormControl, FormGroup } from '@angular/forms'

interface Exercise {
  name: string
  description: string
  id: number
  url: string
}

interface MyRoutine {
  exercise: string
  reps: number
  break: number
}

@Component({
  selector: 'app-custom-routine',
  templateUrl: './custom-routine.component.html',
  styleUrls: ['./custom-routine.component.css'],
})
export class CustomRoutineComponent implements OnInit {
  exercisesList: Array<Exercise> = (exercisesJson as any).default

  myRoutine: Array<MyRoutine> = []

  trainingRoomStatus:boolean = true;
  
  exerciseFormGroup = new FormGroup({
    reps: new FormControl(''),
    break: new FormControl(''),
    exerciseName: new FormControl(''),
  })

  constructor() {}

  ngOnInit(): void {
    this.exerciseFormGroup.controls['reps'].setValue('6')
    this.exerciseFormGroup.controls['break'].setValue('30')
    this.exerciseFormGroup.controls['exerciseName'].setValue("PUSH-UPS")
  }

  onSubmit() {
    console.log(this.myRoutine)
    this.trainingRoomStatus=true
  }
  showRoutinesCustom(){
    this.trainingRoomStatus=false

  }
  addExercise() {



    this.myRoutine.push({
      exercise: this.exerciseFormGroup.controls['exerciseName'].value,
      reps: this.exerciseFormGroup.controls['reps'].value,
      break: this.exerciseFormGroup.controls['break'].value,
    })
  }
}
