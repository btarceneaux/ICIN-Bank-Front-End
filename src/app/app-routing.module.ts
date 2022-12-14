import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckingDetailsComponent } from './checking-details/checking-details.component';
import { DepositComponent } from './deposit/deposit.component';
import { LoginComponent } from './login/login.component';
import { SavingsDetailsComponent } from './savings-details/savings-details.component';
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
  {path:"savingsDetails", component:SavingsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
