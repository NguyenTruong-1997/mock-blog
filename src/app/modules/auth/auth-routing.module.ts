import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth-guard.service';
import { LoginGuardService } from 'src/app/shared/services/login-guard.service';

import { LoginComponent } from './components/login/login.component';
import { SettingComponent } from './components/setting/setting.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'register',
    component: SignupComponent,
    canActivate: [LoginGuardService],
  },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
