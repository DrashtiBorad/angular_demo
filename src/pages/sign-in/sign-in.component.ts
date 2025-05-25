import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../api/user/users.service';
import { LoginPayload } from '../../api/user/types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [RouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  showPassword = false;
  errorMessage: string | null = null;
  constructor(private userServise: UsersService, private router: Router) {}

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    if (this.signInForm.valid) {
      const payload = {
        email: this.signInForm.value.email || '',
        password: this.signInForm.value.password || '',
      };

      this.userServise.loginUser(payload as LoginPayload).subscribe({
        next: (data) => {
          console.log('Login successful:', data);
          this.signInForm.reset();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = error?.error?.error;

          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        },
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}
