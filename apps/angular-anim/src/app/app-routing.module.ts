import { AccountSummaryComponent } from '@angular-anim/feature/account-summary';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AppGuard } from './app.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { TransfersComponent } from './transfers/transfers.component';

// DONE: 2. We've setup these routes and have them on the page but they aren't working
const routes: Routes = [
  { path: '', component: RegisterComponent },
  {
    path: 'summary',
    canActivate: [AppGuard],
    component: AccountSummaryComponent,
  },
  { path: 'about', canActivate: [AppGuard], component: AboutComponent },
  {
    path: 'account/:id',
    canActivate: [AppGuard],
    component: AccountDetailsComponent,
  },
  { path: 'transfers', canActivate: [AppGuard], component: TransfersComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
