import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  constructor(private route: Router) {}
  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  onSubmit() {
    console.log(this.signUpForm.value);
    this.route.navigate(['/signIn']);
  }
}
