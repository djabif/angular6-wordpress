import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: string = 'http://wordpress.startapplabs.com/blog/wp-json/wp/v2/';

  constructor(
   private http: HttpClient
 ){
 }

 getPost(postId){
   return new Promise((resolve, reject) => {
     this.http.get(this.url + 'posts/' + postId).subscribe(data => {
       // Read the result field from the JSON response.
       resolve(data);
     });
   });
  }

  getComments(postId){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'comments?post=' + postId, { observe: 'response' }).subscribe(data => {
        // Read the result field from the JSON response.
        resolve(data);
      });
    });
  }

  getCommentsByPage(postId, page : number){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'comments?post=' + postId + '&page=' + page).subscribe(data => {
        // Read the result field from the JSON response.
        resolve(data);
      });
    });
  }

  getAuthor(authorId){
    return new Promise((resolve, reject) => {
      this.http.get(this.url  + "users/" + authorId).subscribe(data => {
        // Read the result field from the JSON response.
        resolve(data);
      });
    });
  }

  getCategories(categoriesIds){
    return new Promise((resolve, reject) => {
      let result = [];
      debugger
      for(let categoryId of categoriesIds){
        this.http.get(this.url + "categories/" + categoryId).subscribe(data => {
          // Read the result field from the JSON response.
          result.push(data);
        });
      }
      resolve(result);
    });
  }
}
