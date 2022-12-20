import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
import { CheckbookRequestsComponent } from './checkbook-requests/checkbook-requests.component';
import { CheckingDetailsComponent } from './checking-details/checking-details.component';
import { DepositComponent } from './deposit/deposit.component';
import { HomeComponent } from './home/home.component';
import { RequestCheckBookComponent } from './request-check-book/request-check-book.component';
import { SavingsDetailsComponent } from './savings-details/savings-details.component';
import { TransferComponent } from './transfer/transfer.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';

const routes: Routes = 
[
  {path:"createUser",component:UserComponent},
  {path:"",component:HomeComponent},
  {path:"userHome", component:UserHomeComponent},
  {path:"userProfile", component:UserProfileComponent},
  {path:"deposit", component:DepositComponent},
  {path:"withdrawal",component:WithdrawalComponent},
  {path:"checkingDetails",component:CheckingDetailsComponent},
  {path:"savingsDetails", component:SavingsDetailsComponent},
  {path:"transfer", component:TransferComponent},
  {path:"request", component:RequestCheckBookComponent},
  {path:"admin",component:AdminComponent},
  {path:"checkbookRequests",component:CheckbookRequestsComponent},
  {path:"adminUsers",component:AdminUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
