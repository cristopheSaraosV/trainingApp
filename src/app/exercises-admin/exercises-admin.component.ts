import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise'
import { ExerciseService } from '../services/exercise/exercise.service';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from '../services/auth/auth.service';

interface ExerciseResponseI {
  status:boolean,
  msg:String
}

@Component({
  selector: 'app-exercises-admin',
  templateUrl: './exercises-admin.component.html',
  styleUrls: ['./exercises-admin.component.css']
})
export class ExercisesAdminComponent implements OnInit {

  classError = '';
  exercisesList: Array<Exercise> = new Array<Exercise>();
  isNew:Boolean = true;

  exerciseResponse:ExerciseResponseI = {
    status:false,
    msg:""
  };

  selectedEexercise:Exercise = {
    name:"",
    description:"",
    _id:""
  };

  constructor(private ExerciseApi: ExerciseService, public authService: AuthService) { }

  exerciseFormGroup = new FormGroup({
		name: new FormControl(""),
		description: new FormControl(""),
	});

  ngOnInit(): void {
    this.ExerciseApi.getExerciseAll().subscribe((exerciseListApi)=>{
      this.exercisesList = exerciseListApi;
    });

  
  }

  onSubmitNew(){
    const exerciseIn = {
      name: this.exerciseFormGroup.controls["name"].value,
      description : this.exerciseFormGroup.controls["description"].value,
      _id : "",
    }

    const token = this.authService.getToken();

    this.ExerciseApi.saveExercise(exerciseIn,token).subscribe((exerciseRes:any)=>{
      if(exerciseRes.status){
        this.exerciseResponse.status = true,
        this.exerciseResponse.msg = exerciseRes.msg
      }
    },(errorCather:any) => {
      errorCather.error.errors.map((item:any) => {
        this.exerciseResponse.msg += item.msg + ' || ';
        this.classError = 'alert alert-danger'

        this.exerciseResponse.status = false;
        setTimeout(() =>{
          this.exerciseResponse.status = false;
          this.exerciseResponse.msg = '';
          this.classError = '';
  
        },5000 )
    })
    })
    
  }

  onSubmitEdit(){
    const exerciseIn = {
      name: this.exerciseFormGroup.controls["name"].value,
      description : this.exerciseFormGroup.controls["description"].value,
      _id : this.selectedEexercise._id,
    }
    const token = this.authService.getToken();

    this.ExerciseApi.updateExercise(exerciseIn,this.selectedEexercise._id,token).subscribe((exerciseRes:any)=>{
      if(exerciseRes.status){
        this.exerciseResponse.status = true,
        this.exerciseResponse.msg = exerciseRes.msg
      }

      setTimeout(() =>{
        this.exerciseResponse.status = false;
        this.exerciseResponse.msg = '';
        this.classError = '';

      },3000 )
    },(errorCather:any ) => {
      errorCather.error.errors.map((item:any) => {
        this.exerciseResponse.msg += item.msg + ' || ';
        this.classError = 'alert alert-danger';
        this.exerciseResponse.status = false;
        setTimeout(() =>{
          this.exerciseResponse.status = false;
          this.exerciseResponse.msg = '';
          this.classError = '';
  
        },5000 )
      })
    })
  }

  editExercise(exerciseIn:any,id:string){
    this.isNew= false;   
    this.selectedEexercise.name = exerciseIn.name;
    this.selectedEexercise.description = exerciseIn.description;
    this.selectedEexercise._id = exerciseIn._id;

  }
  
  newExercise(){
    this.selectedEexercise.name = "";
    this.selectedEexercise.description = "";
    this.selectedEexercise._id ="";

    this.isNew= true;  
  }

  

}
