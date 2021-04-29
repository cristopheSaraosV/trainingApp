import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ExercisesComponent } from './exercises/exercises.component'
import { HomeComponent } from './home/home.component'
import { IndexComponent } from './index/index.component'
import { ParksComponent } from './parks/parks.component'
import { RoutinesComponent } from './routines/routines.component'
import { HomeRoutinesComponent } from './home-routines/home-routines.component'
import { CustomRoutineComponent } from './custom-routine/custom-routine.component'
import { TrainingRoomComponent } from './training-room/training-room.component'

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { 
        path: 'trainer',
        component: HomeRoutinesComponent   
      },      
      { 
        path: 'presentRoutine',
        component: ExercisesComponent 
      },
      { 
        path: 'customRoutine',
        component: RoutinesComponent 
      },
      { 
        path: 'routines',
        component: RoutinesComponent 
      },
      { 
        path: 'routinesCustom',
        component: CustomRoutineComponent,
        children:[
          {
            path: 'trainingRoom',
            component: TrainingRoomComponent
          }
        ]
      },
      { 
        path: 'exercises',
        component: ExercisesComponent 
      },
      {
        path: 'parks',
        component: ParksComponent,
      }
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
