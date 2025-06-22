import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../api/user/users.service';
import { NgIf } from '@angular/common';
import { passwordMatchValidator } from '../../validation/customValidator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  errorMessage: string | null = null;
  showPassword = false;
  showConfirmPassword = false;
  submitted = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  constructor(
    private route: Router,
    private userService: UsersService,
    private toastr: ToastrService
  ) {}

  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator() }
  );

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      const payload = {
        name: this.signUpForm.value.name || '',
        email: this.signUpForm.value.email || '',
        password: this.signUpForm.value.password || '',
        confirmPassword: this.signUpForm.value.confirmPassword || '',
        role: 'user',
      };
      this.userService.registerUser(payload).subscribe({
        next: (data) => {
          this.toastr.success('Registration successful');
          this.signUpForm.reset();
          this.route.navigate(['/signIn']);
        },
        error: (error) => {
          this.errorMessage = error?.error?.error;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        },
      });
    }
  }
}
