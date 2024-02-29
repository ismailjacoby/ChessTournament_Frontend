import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PlayersComponent } from './players/players.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { ScoreComponent } from './score/score.component';
import {authInterceptor} from "./interceptor/auth.interceptor";
import {DetailsComponent} from "./tournaments/details/details.component";
import {ListComponent} from "./tournaments/list/list.component";
import {CreateComponent} from "./tournaments/create/create.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlayersComponent,
    TournamentsComponent,
    DetailsComponent,
    ListComponent,
    CreateComponent,
    LoginComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
