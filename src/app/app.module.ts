import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RoutinesComponent } from './routines/routines.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { ParksComponent } from './parks/parks.component';
import { HomeRoutinesComponent } from './home-routines/home-routines.component';
import { CustomRoutineComponent } from './custom-routine/custom-routine.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingRoomComponent } from './training-room/training-room.component';
import { HttpClientModule } from '@angular/common/http'
import { ParkService } from './services/park/park.service';
import { ExerciseService } from './services/exercise/exercise.service';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ExercisesAdminComponent } from './exercises-admin/exercises-admin.component';
import { ParksAdminComponent } from './parks-admin/parks-admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoutinesComponent,
    ExercisesComponent,
    IndexComponent,
    ParksComponent,
    HomeRoutinesComponent,
    CustomRoutineComponent,
    TrainingRoomComponent,
    HomeAdminComponent,
    ExercisesAdminComponent,
    ParksAdminComponent,
    LoginAdminComponent,
    UsersAdminComponent
  ],
  imports:[
    [
      BrowserModule,  
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    FormsModule  
  ] ,
  providers: [
    ParkService,
    ExerciseService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
