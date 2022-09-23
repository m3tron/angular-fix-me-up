import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Account } from './account';
import { ACCOUNTS } from './mock-accounts';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  getAccounts(): Observable<Account[]> {
    const accounts: Account[] = ACCOUNTS;
    return of(accounts);
  }

  // *** REVISIT AND REVISE ***
  getAccount(id: string) {
    const accounts: Account[] = ACCOUNTS;
    return accounts.find((account) => account.id === id);
  }
}
