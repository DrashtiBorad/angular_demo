import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  imports: [RouterModule],
  templateUrl: './otp-verification.component.html',
})
export class OtpVerificationComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  queryParam: string = '';

  ngOnInit() {
    this.queryParam = this.route.snapshot.queryParams['email'];
  }
  onVerifyOtp() {
    this.router.navigate(['reset-password']);
  }
}
