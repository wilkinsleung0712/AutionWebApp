import { Injectable } from "@angular/core";
import { Product, Comment } from '../model/model';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProductService {

  constructor(private http: Http) {

  }

  getCategory(): Observable<string[]> {
    return this.http.get('/api/categories').map(res => res.json());
  }

  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products').map(res => res.json());
  }

  getComments(productId: number): Observable<Comment[]> {
    return this.http.get('/api/product/' + productId + '/comments').map(res => res.json());
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get('/api/product/' + productId).map(res => res.json());
  }

  getProductComments(productId: number): Observable<Comment[]> {
    return this.http.get('/api/product/' + productId + '/comments').map(res => res.json());
  }
}
