import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../../utils/post-type';
import { NgForm } from '@angular/forms';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  newPost: string;
  // tslint:disable-next-line: no-inferrable-types
  enteredTitle: string = '';
  // tslint:disable-next-line: no-inferrable-types
  enteredContent: string = '';



  constructor (private postService: PostService) { }

  ngOnInit(): void {
  }
  onAddPost(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value?.title,
      body: form.value?.content,
      userId: new Date().getTime()
    };
    this.postService.addPosts(post);
    form.resetForm();
  }

}
