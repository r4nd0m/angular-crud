import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Comment } from 'src/app/model/comment';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() deleteComment: EventEmitter<Comment> = new EventEmitter();
  @Output() saveComment: EventEmitter<Comment> = new EventEmitter();

  initialComment: Comment;

  constructor() { }

  ngOnInit() {
    this.initialComment = {...this.comment};
  }

  isEditable(): boolean {
    return true;
  }

  isDirty(): boolean {
    return this.comment.body != this.initialComment.body;
  }

  isValid(): boolean {
    return this.comment.body.length !== 0 && this.comment.body.length < 200;
  }

  isSaveable(): boolean {
    return this.isEditable() && this.isDirty() && this.isValid();
  }

  onSaveComment() {
    this.saveComment.emit(this.comment);
  }

  onDeleteComment() {
    this.deleteComment.emit(this.comment);
  }

}
