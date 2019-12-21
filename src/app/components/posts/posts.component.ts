import { Component, OnInit } from '@angular/core';
import { BackendDataService } from 'src/app/services/backend-data.service';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Array<Post>;
  isLoading: boolean;
  isError: boolean;

  constructor(private backend: BackendDataService) { }

  ngOnInit() {
    this.isLoading = true;
    this.isError = false;

    this.backend.getPosts().subscribe(
      (data: Array<Post>) => {
        this.posts = data;
        this.isLoading = false;
        this.isError = false;
      }, 
      (error: any) => {
        this.isLoading = false;
        this.isError = true;

        console.log(error);
      }
    );
  }

}
