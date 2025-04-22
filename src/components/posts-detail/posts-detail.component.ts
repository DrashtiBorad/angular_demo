import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../../api/posts/posts.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-posts-detail',
  imports: [NgFor, RouterModule, NgIf],
  templateUrl: './posts-detail.component.html',
})
export class PostsDetailComponent {
  userId: string = '';
  postDetails: any = {};

  constructor(
    private activeRoute: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.userId =
      this.activeRoute.snapshot.paramMap.get('id')?.toString() || '';
    this.postsService.getPostsById(this.userId).subscribe((data) => {
      this.postDetails = data;
      console.log(this.postDetails);
    });
  }
}
