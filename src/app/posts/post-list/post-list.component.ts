import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Post } from '../../utils/post-type';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy, AfterViewInit {
  posts: Array<Post> = [];
  private postsSubscription: Subscription;
  constructor (private postService: PostService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.postService.getPosts();
    this.postsSubscription = this.postService.getPostUpdatedListner().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
  onDeletePost(id) {
    this.postService.deletePost(id);
    //this.posts = this.posts.filter((post) => post.id !== id);
  }

}
