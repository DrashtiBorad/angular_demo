import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../api/user/users.service';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  constructor(private router: Router, private userService: UsersService) {}
  errorMessage: string | null = null;
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.userService
        .sendOtp({ email: this.forgotPasswordForm.value.email || '' })
        .subscribe({
          next: (data) => {
            this.router.navigate(['/otp-verification'], {
              queryParams: {
                email: this.forgotPasswordForm.value.email,
              },
            });
            this.forgotPasswordForm.reset();
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
