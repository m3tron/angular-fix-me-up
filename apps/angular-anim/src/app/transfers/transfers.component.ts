import { AccountService, Account } from '@angular-anim/shared/services';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'angular-anim-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
})
export class TransfersComponent implements OnInit {
  accounts$: Observable<Account[]> = of([]);
  accounts: Account[] = [];

  toAccounts!: Account[];

  transferForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getAccounts().subscribe((accounts) => {
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
    console.log(this.transferForm);
  }
}
