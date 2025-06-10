import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../api/user/users.service';

@Component({
  selector: 'app-otp-verification',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './otp-verification.component.html',
})
export class OtpVerificationComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  queryParam: string = '';

  otpVerificationForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.maxLength(6)]),
  });

  ngOnInit() {
    this.queryParam = this.route.snapshot.queryParams['email'];
  }
  onVerifyOtp() {
    if (this.otpVerificationForm.valid) {
      this.userService
        .otpVerification({
          email: this.queryParam,
          otp: Number(this.otpVerificationForm.value.otp),
        })
        .subscribe({
          next: () => {
            alert('OTP verified successfully');
            this.router.navigate(['reset-password']);
            this.otpVerificationForm.reset();
          },
          error: (err) => {
            alert('Invalid OTP');
            console.error(err);
          },
        });
    }
  }
}
