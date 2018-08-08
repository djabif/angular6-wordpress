import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { CategoryService } from '../category/category.service';

@Injectable()
export class CategoryResolver implements Resolve<any> {

  constructor(
    public categoryService: CategoryService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {

    let items = [];

    return new Promise((resolve, reject) => {
      var categoryId = route.paramMap.get('id');
      this.categoryService.getPostsByCategory(categoryId)
      .then( res => {
        debugger
        for(let item of <Array<any>> res.body){
          item.excerpt.rendered = item.excerpt.rendered.split('<a')[0] + "</p>";
          items.push(item);
        }
        let postWithPages = {
          posts: items,
          pages: res.headers.get('X-WP-TotalPages'),
          totalPosts: res.headers.get('X-WP-Total'),
          categoryId: categoryId
        }
        return resolve(postWithPages)
      }, err => {
        return reject(err);
      })
    })
  }
}
