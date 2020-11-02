import { Injectable } from '@angular/core';
import { Post } from '../utils/post-type';
import { HttpClient } from '@angular/common/http'
import { Subject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor (private http: HttpClient) { }
  private posts: Array<Post> = [];
  private postUpdated = new Subject<Array<Post>>();

  getPosts(): void {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
      .pipe(map((data) => {
        return data.posts.map((post: any) => {
          return {
            title: post.title,
            body: post.body,
            id: post._id,
            userId: post.userId
          };
        });

      })).subscribe((transformedPost) => {
        this.posts = transformedPost;
        console.log(transformedPost);
        this.postUpdated.next(this.posts);
      });

  }

  getPostUpdatedListner(): Observable<Post[]> {
    return this.postUpdated.asObservable();
  }

  addPosts(post: Post): void {
    this.http.post<{ message: string, post_id: string }>('http://localhost:3000/api/post/', post)
      .subscribe((transformedPost) => {
        console.log(transformedPost);
        const postId = transformedPost.post_id;
        post.id = postId;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string): void {
    this.http.delete<{ message: string, post_id: string }>('http://localhost:3000/api/posts/' + postId)
      .subscribe((data) => {
        console.log('Post deleated!');
        this.posts = this.posts.filter((post) => post.id !== data.post_id);
        this.postUpdated.next([...this.posts]);
      });
  }
}
