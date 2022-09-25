import { SideNavItem } from '@angular-anim/shared/presentational';
import { UserFacade } from '@angular-anim/shared/store';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userActions } from '@angular-anim/shared/store';
import { startWith } from 'rxjs';

@Component({
  selector: 'angular-anim-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  sideNavItems: SideNavItem[] = [];
  user$ = this.userFacade.getUser();
  userName$ = this.userFacade.getUserName().pipe(startWith('Not Logged In'));
  newUser = {
    name: 'bob',
    address: 'address',
    phone: 'phone',
    roles: ['some role'],
  };

  create(newus: any) {
    this.store.dispatch(userActions.CreateUser({ user: newus }));
  }

  constructor(private userFacade: UserFacade, private store: Store) {}

  ngOnInit() {
    this.sideNavItems = [
      { title: 'Account Overview', subtitle: '', link: '/' },
      { title: 'Transfers', subtitle: '', link: '/transfers' },
      { title: 'About Challenge', subtitle: '', link: '/about' },
    ];
    this.create(this.newUser);
  }
}
