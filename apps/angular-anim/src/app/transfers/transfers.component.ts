import { AccountService, Account } from '@angular-anim/shared/services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'angular-anim-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
})
export class TransfersComponent implements OnInit, OnDestroy {
  accounts$: Observable<Account[]> = of([]);
  unsubscribe$ = new Subject<void>();
  accounts: Account[] = [];

  toAccounts!: Account[];

  transferForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService
      .getAccounts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((accounts) => {
        this.accounts = accounts;
      });
  }

  onChange(e: any) {
    this.filteredAccounts(e.target.value);
    this.transferForm.controls.to.setValue('');
  }

  filteredAccounts(id: string) {
    this.toAccounts = this.accounts.filter(
      (account) => account.id !== id.slice(3) || ''
    );
  }

  onSubmit() {
    console.log(this.transferForm.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
