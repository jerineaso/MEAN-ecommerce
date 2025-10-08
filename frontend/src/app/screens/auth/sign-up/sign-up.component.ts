import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModuleService } from 'src/app/@core/services/auth-module.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  // Variable Initializations
  signUpBtnSubmitted : boolean = false;

  constructor(
    private authService: AuthModuleService,
    public router: Router,
    private fb: FormBuilder
  ) { }

  // FormGroup
  signUpForm = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]]
  });

  get f() {
    return this.signUpForm.controls;
  }

  ngOnInit(): void { }

  // Sign up setup
  signUpSetup() {
    this.signUpBtnSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.authService.userSignUp(this.signUpForm.value).subscribe((res: any) => {
      if(res?.body?.data) {
        this.router.navigate(['/login']);
      }
      this.signUpBtnSubmitted = false;
    }, (err: any) => {
      this.signUpBtnSubmitted = false;
    });
  }
}
