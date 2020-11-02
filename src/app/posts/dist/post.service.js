"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.PostService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var PostService = /** @class */ (function () {
    function PostService(http) {
        this.http = http;
        this.posts = [];
        this.postUpdated = new rxjs_1.Subject();
    }
    PostService.prototype.getPosts = function () {
        var _this = this;
        this.http.get('http://localhost:3000/api/posts')
            .pipe(operators_1.map(function (data) {
            return data.posts.map(function (post) {
                return {
                    title: post.title,
                    body: post.body,
                    id: post._id,
                    userId: post.userId
                };
            });
        })).subscribe(function (transformedPost) {
            _this.posts = transformedPost;
            console.log(transformedPost);
            _this.postUpdated.next(_this.posts);
        });
    };
    PostService.prototype.getPostUpdatedListner = function () {
        return this.postUpdated.asObservable();
    };
    PostService.prototype.addPosts = function (post) {
        var _this = this;
        this.http.post('http://localhost:3000/api/post', post)
            .pipe(operators_1.map(function (data) {
            return data.post.map(function (post) {
                return {
                    title: post.title,
                    body: post.body,
                    id: post._id,
                    userId: post.userId
                };
            });
        }))
            .subscribe(function (transformedPost) {
            console.log(transformedPost.message);
            _this.posts.push(post);
            _this.postUpdated.next(__spreadArrays(_this.posts));
        });
    };
    PostService.prototype.deletePost = function (postId) {
        var _this = this;
        this.http["delete"]('http://localhost:3000/api/post' + postId)
            .subscribe(function (data) {
            console.log(data);
            console.log('Post deleated!');
            _this.posts = _this.posts.filter(function (post) { return post.id !== parseInt(postId); });
            _this.postUpdated.next(__spreadArrays(_this.posts));
        });
    };
    PostService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
