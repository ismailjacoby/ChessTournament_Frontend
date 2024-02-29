import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";

export const isConnectedGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);


  if(_authService.isLoggedIn()){
    _router.navigate(['tournaments'])
    return false;
  } else{
    return true;
  }
};
