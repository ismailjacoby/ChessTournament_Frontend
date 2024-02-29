import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;
  errorMessage: string = '';

  constructor(private _authService: AuthService, private _router: Router) {
  }

  onSubmit(){
    this._authService.login(this.username,this.password).subscribe(response => {
      this._authService.userRole = response.role;
      this._router.navigate(['/tournaments'])
      console.log(response)
      }, error => {
      console.log(error);

      if (error.status === 403) {
        this.errorMessage = 'Invalid username or password.';
      } else {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
      }
    )
  }

}
