import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { BackendDataService } from 'src/app/services/backend-data.service';
import { Comment } from 'src/app/model/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  postId: Number;
  comments: Array<Comment>;
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  isLoadingError: boolean;
  isSavingError: boolean;
  isDeletingError: boolean;

  constructor(private route: ActivatedRoute, private backend: BackendDataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.postId = Number(params.get("id"));

      this.isLoading = true;
      this.isLoadingError = false;  

      this.backend.getComments().subscribe(
        (data: Array<Comment>) => {
          this.comments = data.filter((comment: Comment) => comment.postId == this.postId);

          setTimeout(() => {
            this.isLoading = false;
            this.isLoadingError = false;
          }, 500);
        },
        (error: any) => {
          this.isLoading = false;
          this.isLoadingError = true;

          console.log(error);
        }
      );
    })
  }

  onSaveComment(comment: Comment) {
    this.isSaving = true;
    this.isSavingError = false;

    this.backend.saveComment(comment).subscribe((savedComment: Comment) => {
        setTimeout(() => {
          this.isSaving = false;
          this.isSavingError = false;
        }, 500);

        // refresh one specific comment instead of complete reloading
        for (let i=0; i < this.comments.length; i++) {
          if (this.comments[i].id === savedComment.id) {
            this.comments[i] = savedComment;
            break;
          }
        }
      },
      (error: any) => {
        setTimeout(() => {
          this.isSaving = false;
          this.isSavingError = true;
        }, 500);

        console.log(error);
      }
    )
  }

  onDeleteComment(comment: Comment) {
    if (window.confirm(`Are you sure you want to delete comment #${comment.id}?`)) {

      this.isDeleting = true;
      this.isDeletingError = false;
  
      this.backend.deleteComment(comment).subscribe(() => {
          setTimeout(() => {
            this.isDeleting = false;
            this.isDeletingError = false;
          }, 500);
  
          this.comments = this.comments.filter(tmpComment => tmpComment.id != comment.id);
        },
        (error: any) => {
          setTimeout(() => {
            this.isDeleting = false;
            this.isDeletingError = true;
          }, 500);
  
          console.log(error);
        }
      )
    }
  }
}
