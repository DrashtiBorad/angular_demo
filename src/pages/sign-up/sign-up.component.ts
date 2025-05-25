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

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  errorMessage: string | null = null;
  showPassword = false;
  showConfirmPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  constructor(private route: Router, private userService: UsersService) {}

  signUpForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl(''),
    },
    { validators: passwordMatchValidator() }
  );

  onSubmit() {
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
