import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { CategoryComponent } from './category/category.component';
import { HomeResolver } from './home/home.resolver';
import { PostResolver } from './post/post.resolver';
import { CategoryResolver } from './category/category.resolver';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, resolve: { data: HomeResolver} },
  { path: 'post/:id', component: PostComponent, resolve: {data: PostResolver} },
  { path: 'category/:id', component: CategoryComponent, resolve: {data: CategoryResolver} }
];
