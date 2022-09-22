import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Account } from '@angular-anim/shared/services';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '@angular-anim/shared/services';

@Component({
  selector: 'angular-anim-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent {
  account?: Account;
  id: string = this.route.snapshot.params['id'];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.account = this.accountService.getAccount(this.id);
    console.log(this.account);
  }
}
