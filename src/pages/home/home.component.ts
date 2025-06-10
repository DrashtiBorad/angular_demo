import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserStoreService } from '../../store/user-store.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, NgIf],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private userStore: UserStoreService) {}
  count: number = 0;
  private intervalId: any;
  isAdminUser: boolean = false;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count++;
    }, 1000);
    this.userStore.user.subscribe((user) => {
      console.log('User data:', user[0].role);
      user[0].role == 'admin'
        ? (this.isAdminUser = true)
        : (this.isAdminUser = false);
    });
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
