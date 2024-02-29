import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayersComponent} from "./players/players.component";
import {TournamentsComponent} from "./tournaments/tournaments.component";
import {LoginComponent} from "./login/login.component";
import {ScoreComponent} from "./score/score.component";
import {CreateComponent} from "./tournaments/create/create.component";
import {DetailsComponent} from "./tournaments/details/details.component";
import {ListComponent} from "./tournaments/list/list.component";

const routes: Routes = [
  {path:'players', component: PlayersComponent} ,
  {path:'login', component:LoginComponent},
  {path:'score', component: ScoreComponent},
  { path: 'tournaments', redirectTo: 'tournaments/list', pathMatch: 'full' },
  {path:'tournaments', component: TournamentsComponent, children:[
      {path: 'list', component: ListComponent},
      {path: 'create', component: CreateComponent},
      {path: 'details/:id', component:DetailsComponent}
    ]
  },
  { path: '', redirectTo: 'tournaments/list', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
