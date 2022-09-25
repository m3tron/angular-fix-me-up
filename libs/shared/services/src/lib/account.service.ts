import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Account } from './account';
import { ACCOUNTS } from './mock-accounts';

export interface Transfer {
  from: string;
  to: string;
  amount: number;
}
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  getAccounts(): Observable<Account[]> {
    const accounts: Account[] = ACCOUNTS;
    return of(accounts);
  }

  // TODO: *** REVISIT AND REVISE ***
  getAccount(id: string) {
    const accounts: Account[] = ACCOUNTS;
    return accounts.find((account) => account.id === id);
  }

  createTransfer(transfer: any) {
    const accounts: Account[] = ACCOUNTS;
    const from: any = accounts.find((account) => account.id === transfer.from);
    const to: any = accounts.find((account) => account.id === transfer.to);
    const amount = transfer.amount;

    if (from.balance < amount) {
      throw Error('Insuffecient Funds');
    }

    // TODO: ***need to figure out exchange rate if different currencies

    from.balance = from.balance - amount;
    to.balance = to.balance + amount;
  }
}
