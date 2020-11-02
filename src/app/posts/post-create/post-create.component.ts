import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../../utils/post-type';
import { NgForm } from '@angular/forms';

import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component( {
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
} )

export class PostCreateComponent implements OnInit {
  newPost: string;
  // tslint:disable-next-line: no-inferrable-types
  enteredTitle: string = '';
  // tslint:disable-next-line: no-inferrable-types
  enteredContent: string = '';
  isLoading: boolean = true;
  public mode: string = 'create';
  private postId: string;
  post: Post;


  constructor ( private postService: PostService, public activeRoute: ActivatedRoute ) { }

  ngOnInit (): void {
    this.activeRoute.paramMap.subscribe( ( paramMap: ParamMap ) => {
      if ( paramMap.has( 'postId' ) ) {
        this.mode = 'edit';
        this.postId = paramMap.get( 'postId' );
        this.postService.getPost( this.postId ).subscribe( ( currentpost: Post ) => {
          this.post = currentpost;
          this.isLoading = false;
        } )
      } else {
        this.mode = 'create';
        this.postId = null;
      }

    } );
  }
  onSavePost ( form: NgForm ): void {
    if ( form.invalid ) {
      return;
    }
    const post: Post = {
      title: form.value?.title,
      body: form.value?.content,
      userId: new Date().getTime()
    };
    this.isLoading = true;
    if ( this.mode == 'create' ) {
      this.postService.addPosts( post );

    } else {
      this.postService.updatePost( this.post.id, post.title, post.body, post.userId )
    }
    form.resetForm();
  }


}
