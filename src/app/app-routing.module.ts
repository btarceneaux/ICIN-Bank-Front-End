import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserComponent } from './user/user.component';

const routes: Routes = 
[
  {path:"login", component:LoginComponent},
  {path:"createUser",component:UserComponent},
  {path:"home", component:UserHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
