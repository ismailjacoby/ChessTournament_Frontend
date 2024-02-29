import { Injectable } from '@angular/core';
import { Player } from '../components/players/players.component';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private _http:HttpClient) { }

  registerPlayer(player: Player): Observable<any>{
    return this._http.post<any>('http://localhost:8080/user/register', player);
  }
}
