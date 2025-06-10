import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserStoreService } from '../../../../store/user-store.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private userService: UserStoreService) {}
  currentUser: any;
  ngOnInit() {
    this.userService.user.subscribe((user) => {
      this.currentUser = user;
    });
  }

  onLogOut() {
    this.userService.clearUser();
  }
}
