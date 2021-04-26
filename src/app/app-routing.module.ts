import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ExercisesComponent } from './exercises/exercises.component'
import { HomeComponent } from './home/home.component'
import { IndexComponent } from './index/index.component'
import { ParksComponent } from './parks/parks.component'
import { RoutinesComponent } from './routines/routines.component'

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
        path: 'my-routines',
        component: RoutinesComponent 
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
