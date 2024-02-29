import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DetailsComponent} from "./details/details.component";
import {CreateComponent} from "./create/create.component";
import {ListComponent} from "./list/list.component";
import {TournamentsComponent} from "./tournaments.component";

const routes: Routes = [
  {path:'tournaments', component: TournamentsComponent,
  children:[
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {path:'list', component:ListComponent},
    {path:'create', component:CreateComponent},
    {path:'details/:id', component:DetailsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule { }
