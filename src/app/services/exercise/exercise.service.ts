import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../../models/exercise'

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  public exercise: Exercise = new Exercise();
  constructor( private http: HttpClient ) { }

  getExerciseAll() : Observable<Exercise[]> {
    var local:string,production:string;    
    local = "/api/exercises"
    production = "https://api-res-training-app.herokuapp.com/api/exercises"
    return this.http.get<Exercise[]>(production);
  }

  saveExercise(exerciseIn:Exercise, token:string): Observable<Exercise> {
    
    var local:string,production:string;    
    
    let headers = new HttpHeaders();    
    headers = headers.set('x-token',token );
    
    local = "/api/exercises"
    production = "https://api-res-training-app.herokuapp.com/api/exercises"
    return this.http.post<Exercise>(production,exerciseIn,{headers});
  }
  
  updateExercise(exerciseIn:Exercise,id:string, token:string): Observable<Exercise> {

    var local:string,production:string;    

    let headers = new HttpHeaders();
    headers = headers.set('x-token',token );

    local = `/api/exercises/${id}`
    production = `https://api-res-training-app.herokuapp.com/api/exercises/${id}`

    return this.http.put<Exercise>(production,exerciseIn,{headers});
  }
  
  deleteExercise(id:string, token:string): Observable<Exercise> {

    var local:string,production:string;          
    let headers = new HttpHeaders();    
    headers = headers.set('x-token',token );
    

    local = `/api/exercises/${id}`
    production = `https://api-res-training-app.herokuapp.com/api/exercises/${id}`

    return this.http.delete<Exercise>(production,{headers});
  }

}
