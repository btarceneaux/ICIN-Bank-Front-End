import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { CheckbookRequestsComponent } from './checkbook-requests/checkbook-requests.component';
import { CheckingDetailsComponent } from './checking-details/checking-details.component';
import { DepositComponent } from './deposit/deposit.component';
import { LoginComponent } from './login/login.component';
import { RequestCheckBookComponent } from './request-check-book/request-check-book.component';
import { SavingsDetailsComponent } from './savings-details/savings-details.component';
import { TransferComponent } from './transfer/transfer.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';

const routes: Routes = 
[
  {path:"login", component:LoginComponent},
  {path:"createUser",component:UserComponent},
  {path:"home", component:UserHomeComponent},
  {path:"userProfile", component:UserProfileComponent},
  {path:"deposit", component:DepositComponent},
  {path:"withdrawal",component:WithdrawalComponent},
  {path:"checkingDetails",component:CheckingDetailsComponent},
  {path:"savingsDetails", component:SavingsDetailsComponent},
  {path:"transfer", component:TransferComponent},
  {path:"request", component:RequestCheckBookComponent},
  {path:"loginAdmin",component:AdminLoginComponent},
  {path:"admin",component:AdminComponent},
  {path:"checkbookRequests",component:CheckbookRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
