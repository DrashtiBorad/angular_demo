import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { PostsComponent } from '../pages/posts/posts.component';
import { AddProductComponent } from '../pages/admin/products/products.component';
import { ProductsComponent } from '../pages/products/products.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { PostsDetailComponent } from '../components/posts-detail/posts-detail.component';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from '../pages/otp-verification/otp-verification.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { inject } from '@angular/core';
import { UserStoreService } from '../store/user-store.service';
import { AddProductsComponent } from '../pages/admin/add-products/add-products.component';
import { AuthGuard } from '../guard/auth.guard';
import { AdminGuard } from '../guard/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  {
    path: 'add-products',
    component: AddProductComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'otp-verification', component: OtpVerificationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'posts-detail/:id',
    component: PostsDetailComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin-add-products',
    component: AddProductsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin-edit-products/:id',
    component: AddProductsComponent,
    canActivate: [AdminGuard],
  },
];
