import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {Auth} from "../models/Auth";
import {Roles} from "../models/Roles";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/user/login';
  public userRole!: string;

  connectedUser = new BehaviorSubject<Auth | null>(null);

  constructor(private readonly _http: HttpClient, private readonly _router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const role = localStorage.getItem('role');
      if (role) {
        this.userRole = role;
      }
      let roleConnected: Roles;
      if (role === 'ADMIN') {
        roleConnected = Roles.ADMIN;
      } else {
        roleConnected = Roles.PLAYER;
      }
      this.connectedUser.next({
        token: token,
        role: roleConnected,
        username: localStorage.getItem('username') || ''
      });
    }
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post<Auth>(this.apiUrl,{username, password}).pipe(
      tap(value =>{
        localStorage.setItem('token', value.token);
        localStorage.setItem('role', value.role.toString());
        this.userRole = value.role.toString();
        localStorage.setItem('username', value.username);
        this.connectedUser.next(value);
        this._router.navigate(['tournaments'])
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.userRole = '';
    this.connectedUser.next(null);
    this._router.navigate(['login']);
  }

  getUsername(): string | null{
    return localStorage.getItem('username')
  }

}
