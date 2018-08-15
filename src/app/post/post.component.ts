import { Component, OnInit, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './post.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: any;
  comments: any;
  categories: any;
  pages: number;
  totalPosts: number;
  postId: number;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
     let data = routeData['data'];
     if (data) {
       this.postId = data.postId;
       this.post = data.post;
       this.comments = data.comments;
       this.pages = data.pages;
       this.totalPosts = data.totalPosts;
       this.isLoading = false;
       this.postService.getCategories(this.post.categories)
       .then(categories => {
         this.post.categoriesInfo = categories;
       });
       this.postService.getAuthor(this.post.author)
       .then(result => {
         this.post.authorName = result.name;
        })
     }
   })
  }

  goToCategories(categoryId){
    this.router.navigate(['/category/' + categoryId]);
  }

  pageEvent(event){
    console.log(event)
    this.postService.getCommentsByPage(this.postId, event.pageIndex + 1)
    .then(res =>{
      this.comments = res;
      this.setScrollTop();
    })
  }

  setScrollTop() {
    if (isPlatformBrowser(this.platformId)) {
        window.scroll(0, 750);
    }
  }

}
