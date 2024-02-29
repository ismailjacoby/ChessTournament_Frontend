import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayersComponent} from "./components/players/players.component";
import {TournamentsComponent} from "./tournaments/tournaments.component";
import {LoginComponent} from "./components/login/login.component";
import {ScoreComponent} from "./components/score/score.component";
import {CreateComponent} from "./tournaments/create/create.component";
import {DetailsComponent} from "./tournaments/details/details.component";
import {ListComponent} from "./tournaments/list/list.component";
import {isConnectedGuard} from "./utils/guards/isConnected.guard";
import {isAdminGuard} from "./utils/guards/isAdmin.guard";

const routes: Routes = [
  {path:'players', component: PlayersComponent, canActivate: [isAdminGuard]} ,
  {path:'login', component:LoginComponent, canActivate: [isConnectedGuard]},
  {path:'score', component: ScoreComponent},
  { path: 'tournaments', redirectTo: 'tournaments/list', pathMatch: 'full' },
  {path:'tournaments', component: TournamentsComponent, children:[
      {path: 'list', component: ListComponent},
      {path: 'create', component: CreateComponent, canActivate: [isAdminGuard]},
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
