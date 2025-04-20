import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { TodosComponent } from '../pages/todos/todos.component';
import { UsersComponent } from '../pages/users/users.component';
import { ProductsComponent } from '../pages/products/products.component';
import { ProfileComponent } from '../pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'users', component: UsersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'profile', component: ProfileComponent },
];
