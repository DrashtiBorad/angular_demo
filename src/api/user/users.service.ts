import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../envirenoment';
import { LoginPayload } from './types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  loginUser(payload: LoginPayload) {
    return this.http.post(`${environments.DATA_API_URL}/login`, payload);
  }

  registerUser(payload: LoginPayload) {
    return this.http.post(`${environments.DATA_API_URL}/register`, payload);
  }

  sendOtp(payload: { email: string }) {
    return this.http.post(`${environments.DATA_API_URL}/sendOtp`, payload);
  }
}
