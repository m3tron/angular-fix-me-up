/**
 * TODO: 10. Asynchronous Programming (RxJS)
 * DONE: 13. Angular (NX) Architecture
 */
import { Component, OnInit } from '@angular/core';
import { AccountService, Account } from '@angular-anim/shared/services';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'sum-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
})
export class AccountSummaryComponent implements OnInit {
  accounts$: Observable<Account[]> = of([]);
  constructor(private accountService: AccountService) {}
  accounts: Account[] = [];
  accountsFilter = '';
  currencies!: string[];

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });

    this.currencies = [
      ...new Set(this.accounts.map((account) => account.currency)),
    ];
    console.log(this.currencies);
  }

  filterAccounts(accounts: Account[]) {
    return accounts.filter(
      (acc) =>
        acc.currency === this.accountsFilter || this.accountsFilter === ''
    );
  }
}
