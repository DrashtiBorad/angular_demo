import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../envirenoment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(`${environments.API_URL}/posts`);
  }

  getPostsById(id: string): Observable<any> {
    return this.http.get(`${environments.API_URL}/posts/${id}`);
  }
}
