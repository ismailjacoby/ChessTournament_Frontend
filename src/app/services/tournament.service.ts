import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tournament} from "../models/Tournament";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private apiUrl = 'http://localhost:8080/tournament/'

  constructor(private _http:HttpClient) { }

  createTournament(tournament: Tournament): Observable<any>{
    console.log(tournament)
    return this._http.post<any>(this.apiUrl + "create", tournament);
  }
  getLatestTournaments(): Observable<Tournament[]> {
    return this._http.get<Tournament[]>(`${this.apiUrl}latest`);
  }
  getTournamentById(id: number): Observable<Tournament> {
    return this._http.get<Tournament>(`${this.apiUrl}${id}`);
  }
  registerTournament(params: HttpParams) {
    const url = 'http://localhost:8080/tournament/register';
    return this._http.post(url, {}, { params: params });
  }
  unregisterTournament(params: HttpParams){
    const url = 'http://localhost:8080/tournament/unregister';
    return this._http.post(url, {}, { params: params });
  }

  deleteTournament(id:number){
    return this._http.delete(`${this.apiUrl}delete/${id}`);
  }
}
