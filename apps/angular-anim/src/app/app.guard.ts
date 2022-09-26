import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserFacade } from '@angular-anim/shared/store';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanActivate {
  user$ = this.userFacade.getUser();

  constructor(private router: Router, private userFacade: UserFacade) {}

  canActivate() {
    const user = this.user$.pipe();

    // TODO: check if there a !user and redirect to /register
    // move to service

    return true;
  }
}
