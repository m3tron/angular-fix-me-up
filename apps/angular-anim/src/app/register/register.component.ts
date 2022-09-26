import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userActions } from '@angular-anim/shared/store';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-anim-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: any = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    roles: new FormControl([''], [Validators.required]),
  });
  constructor(private store: Store, private router: Router) {}

  onSubmit() {
    try {
      this.store.dispatch(
        userActions.CreateUser({ user: this.registerForm.value })
      );
      this.registerForm.reset();
      this.router.navigateByUrl('/summary');
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

//TODO: create shared input component
