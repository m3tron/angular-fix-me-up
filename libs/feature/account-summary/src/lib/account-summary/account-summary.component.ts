/**
 * DONE: 10. Asynchronous Programming (RxJS)
 * DONE: 13. Angular (NX) Architecture
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService, Account } from '@angular-anim/shared/services';
import { Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'sum-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
})
export class AccountSummaryComponent implements OnInit, OnDestroy {
  accounts$: Observable<Account[]> = of([]);
  unsubscribe$ = new Subject<void>();
  constructor(private accountService: AccountService) {}
  accounts: Account[] = [];
  accountsFilter = '';
  currencies!: string[];

  ngOnInit(): void {
    this.accountService
      .getAccounts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((accounts) => {
        this.accounts = accounts;
      });

    this.currencies = [
      ...new Set(this.accounts.map((account) => account.currency)),
    ];
  }

  filterAccounts(accounts: Account[]) {
    return accounts.filter(
      (acc) =>
        acc.currency === this.accountsFilter || this.accountsFilter === ''
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
