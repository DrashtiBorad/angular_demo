import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserStoreService } from '../../../../store/user-store.service';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf, NgFor, CommonModule],
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

  showCartSidebar = false;
  cartProducts: any[] = [];
  cartCount = 0;

  toggleCartSidebar() {
    this.showCartSidebar = !this.showCartSidebar;
  }

  removeFromCart(item: any) {
    this.cartProducts = this.cartProducts.filter((p) => p !== item);
    this.cartCount = this.cartProducts.length;
  }

  // // Example: Add to cart method (to be called from product page)
  // addToCart(product: any) {
  //   this.cartProducts.push(product);
  //   this.cartCount = this.cartProducts.length;
  // }
}
