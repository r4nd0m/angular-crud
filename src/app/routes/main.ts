import { Routes } from '@angular/router';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { CommentsComponent } from 'src/app/components/comments/comments.component';

export const mainRoutes: Routes = [
    { path: '', component: PostsComponent },
    { path: 'comments/:id', component: CommentsComponent }
];