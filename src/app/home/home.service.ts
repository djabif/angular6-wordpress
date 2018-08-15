import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url: string = 'http://wordpress.startapplabs.com/blog/wp-json/wp/v2/';

  constructor(
   private http: HttpClient
 ){
 }

 getPosts(){
   return new Promise((resolve, reject) => {
     this.http.get(this.url + 'posts', { observe: 'response' }).subscribe(data => {
       // Read the result field from the JSON response.
       resolve(data);
     });
   });
  }

  getPostsByPage(page: number){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'posts?page=' + page).subscribe(data => {
        // Read the result field from the JSON response.
        resolve(data);
      });
    });
  }

}
