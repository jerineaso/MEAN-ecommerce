import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModuleService } from 'src/app/@core/services/auth-module.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Varibale Initializations
  loginBtnSubmitted : boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthModuleService,
    public router: Router
  ) { }

  loginForm = this.fb.group({ // FormGroup
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  // Login setup
  loginSetup() {
    this.loginBtnSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.userLogin(this.loginForm.value).subscribe((res: any) => {
      if(res?.body?.data) {
        localStorage.setItem('userData', JSON.stringify(res.body?.data));
        this.router.navigate(['/']);
      }
      this.loginBtnSubmitted = false;
    }, (err: any) => {
      console.log(err);
      this.loginBtnSubmitted = false;
    });
  }

  // Forgot password setup
  forgotSetup() {
    console.log("Forgot password");
  }
}
