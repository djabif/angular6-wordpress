import { Component, OnInit, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: Array<any> = new Array<any>();
  pages: number;
  totalPosts: number;
  isLoading: boolean = true;

  constructor(
    private homeService : HomeService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
     let data = routeData['data'];
     if (data) {
       this.items = data.posts;
       this.pages = data.pages;
       this.totalPosts = data.totalPosts;
       this.isLoading = false;
     }
   })
  }

  pageEvent(event){
    console.log(event)
    this.homeService.getPostsByPage(event.pageIndex + 1)
    .then(res =>{
      let posts: Array<any> = new Array<any>();
      for(let item of  <Array<any>> res){
        item.excerpt.rendered = item.excerpt.rendered.split('<a')[0] + "</p>";
        posts.push(item);
      }
      this.items = posts;
      this.setScrollTop();
    })
  }

  readMore(postId){
    this.router.navigate(['/post/' + postId]);
  }

  setScrollTop() {
    if (isPlatformBrowser(this.platformId)) {
        window.scroll(0, 0);
    }
  }

}
