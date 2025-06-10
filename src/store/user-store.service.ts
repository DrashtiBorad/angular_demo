import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userSubject = new BehaviorSubject<any>(this.getStoredUser());
  public user = this.userSubject.asObservable();

  setUser(user: any) {
    localStorage.setItem('token', user.auth);
    localStorage.setItem('user', JSON.stringify(user.result));
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.getValue();
  }
  clearUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
  private getStoredUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  constructor() {}
}
