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

  filter = '';
  toAccounts!: Account[];

  transferForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  errors = this.transferForm.errors;
  error = '';

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService
      .getAccounts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((accounts) => {
        this.accounts = accounts;
      });
  }

  onChange() {
    this.filteredAccounts(this.filter);
    this.transferForm.controls.to.setValue('');
  }

  filteredAccounts(id: string) {
    this.toAccounts = this.accounts.filter(
      (account) => account.id !== id || ''
    );
  }

  onSubmit() {
    if (this.transferForm.invalid) {
      return;
    }

    try {
      console.log(this.transferForm.value);
      this.accountService.createTransfer(this.transferForm.value);
    } catch (error: any) {
      console.log(error.message);
      this.error = error.message;
    }
  }

  showErrors() {
    const { dirty, touched, errors } = this.transferForm.controls.amount;

    return dirty && touched && errors;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
