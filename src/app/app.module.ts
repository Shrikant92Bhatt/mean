import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './headers/header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRouteModule } from './route/route.module';


@NgModule( {
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    AppRouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
} )
export class AppModule { }
