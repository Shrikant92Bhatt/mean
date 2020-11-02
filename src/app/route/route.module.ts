import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from '../posts/post-list/post-list.component';
import { PostCreateComponent } from '../posts/post-create/post-create.component';
import { MaterialModule } from '../angular-material.module';

const route: Routes = [
  { path: '', component: PostListComponent, pathMatch: 'full' },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent }
];
@NgModule( {
  declarations: [],
  imports: [
    MaterialModule,
    RouterModule.forRoot( route ),
  ],
  exports: [RouterModule]
} )
export class AppRouteModule { }
