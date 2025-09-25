import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
// import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthModuleService } from '../../@core/services/auth-module.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    MyAccountComponent,
    CheckOutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthModuleService
  ]
})
export class AuthModule { }
