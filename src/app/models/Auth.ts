import {Roles} from "./Roles";
import {Validators} from "@angular/forms";

export interface Auth{
  username: string;
  token: string;
  role: Roles;
}

export const LOGIN_FORM ={
  username:['', Validators.required],
  password:['', Validators.required]
}
