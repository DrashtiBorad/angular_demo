import { Component } from '@angular/core';
import { PostsService } from '../../api/posts/posts.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-posts',
  imports: [NgFor, NgIf, RouterModule, LoadingComponent],
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
