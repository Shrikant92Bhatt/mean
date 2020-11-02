"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostListComponent = void 0;
var core_1 = require("@angular/core");
var PostListComponent = /** @class */ (function () {
    function PostListComponent(postService) {
        this.postService = postService;
        this.posts = [];
    }
    PostListComponent.prototype.ngOnInit = function () {
    };
    PostListComponent.prototype.ngOnDestroy = function () {
        this.postsSubscription.unsubscribe();
    };
    PostListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.postService.getPosts();
        this.postsSubscription = this.postService.getPostUpdatedListner().subscribe(function (posts) {
            _this.posts = posts;
        });
    };
    PostListComponent = __decorate([
        core_1.Component({
            selector: 'app-post-list',
            templateUrl: './post-list.component.html',
            styleUrls: ['./post-list.component.css']
        })
    ], PostListComponent);
    return PostListComponent;
}());
exports.PostListComponent = PostListComponent;
