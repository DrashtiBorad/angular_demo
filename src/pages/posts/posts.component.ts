import { Component } from '@angular/core';
import { PostsService } from '../../api/posts/posts.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [NgFor, RouterModule],
  templateUrl: './posts.component.html',
})
export class PostsComponent {
  posts: any[] = [];
  userId!: string;

  constructor(private postsService: PostsService) {}
  ngOnInit() {
    this.postsService.getPosts().subscribe((data) => {
      this.posts = data.slice(0, 15);
    });
  }
}
