import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './user/user.service';
import { UserComponent } from './user/user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { CheckingDetailsComponent } from './checking-details/checking-details.component';
import { SavingsDetailsComponent } from './savings-details/savings-details.component';
import { TransferComponent } from './transfer/transfer.component';
import { RequestCheckBookComponent } from './request-check-book/request-check-book.component';
import { AdminComponent } from './admin/admin.component';
import { CheckbookRequestsComponent } from './checkbook-requests/checkbook-requests.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserHomeComponent,
    UserProfileComponent,
    DepositComponent,
    WithdrawalComponent,
    CheckingDetailsComponent,
    SavingsDetailsComponent,
    TransferComponent,
    RequestCheckBookComponent,
    AdminComponent,
    CheckbookRequestsComponent,
    AdminUsersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
