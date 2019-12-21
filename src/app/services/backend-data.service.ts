import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Comment } from 'src/app/model/comment';

@Injectable({
  providedIn: 'root'
})
export class BackendDataService {

  postsEndpointUrl: string = 'http://localhost:3000/posts';
  commentsEndpointUrl: string = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) { }

  getPosts(postId?: Number) {
    return this.http.get(this.postsEndpointUrl + (postId ? `/${postId}` : ''));
  }

  getComments() {
    return this.http.get(this.commentsEndpointUrl);
  }

  saveComment(comment: Comment) {
    return this.http.put(this.commentsEndpointUrl + `/${comment.id}`, comment);
  }

  deleteComment(comment: Comment) {
    return this.http.delete(this.commentsEndpointUrl + `/${comment.id}`);
  }
}
