import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { PostsComponent } from '../pages/posts/posts.component';
import { UsersComponent } from '../pages/users/users.component';
import { ProductsComponent } from '../pages/products/products.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { PostsDetailComponent } from '../components/posts-detail/posts-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'posts-detail/:id', component: PostsDetailComponent },
];
