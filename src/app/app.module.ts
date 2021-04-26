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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoutinesComponent,
    ExercisesComponent,
    IndexComponent,
    ParksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
