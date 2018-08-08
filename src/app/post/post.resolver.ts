import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { PostService } from '../post/post.service';
import { Observable, forkJoin } from "rxjs";

@Injectable()
export class PostResolver implements Resolve<any> {

  constructor(
    public postService: PostService
  ) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      var postId = route.paramMap.get('id');
      forkJoin(
        this.getPostAndAuthor(postId),
        this.getComments(postId))
        .subscribe(data => {
          debugger
          let post = data[0];
          let comments = data[1].body;
          let pages = data[1].headers.get('X-WP-TotalPages');
          let totalPosts = data[1].headers.get('X-WP-Total');
          resolve({
            postId: postId,
            post: post,
            comments: comments,
            pages: pages,
            totalPosts: totalPosts
          })
        });
    })
  }

  getPostAndAuthor(postId){
      return this.postService.getPost(postId)
  }

  getComments(postId){
    return this.postService.getComments(postId)
  }
}
