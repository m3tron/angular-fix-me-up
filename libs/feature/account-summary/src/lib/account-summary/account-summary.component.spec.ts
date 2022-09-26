import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { Account } from '@angular-anim/shared/services';
import { AccountSummaryComponent } from './account-summary.component';

// TODO: 9. Topics in this file: Angular Unit Testing w/ Jest
describe('AccountSummaryComponent', () => {
  let component: AccountSummaryComponent;
  let fixture: ComponentFixture<AccountSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve accounts', () => {
    expect.assertions(2);
    expect(component.accounts$).toBeTruthy();
    component.accounts$.subscribe((acc) => {
      expect(acc.length).toBe(4);
    });
  });

  describe('#filterAccounts', () => {
    it('should return filter accounts', () => {
      // TODO: 10. this test isn't doing anything atm, how can we make it more meaningful?
      const accounts: Account[] = component.accounts;

      component.accountsFilter = 'cad';

      const filtered = component.filterAccounts(accounts);
      expect(filtered.length).toEqual(2);
    });
  });
});
