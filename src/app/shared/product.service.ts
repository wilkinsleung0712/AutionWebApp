import { Injectable, EventEmitter } from '@angular/core';
import { Product, Comment } from '../model/model';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/Rx';

@Injectable()
export class ProductService {

  productSearchEventEmitter: EventEmitter<ProductSearchParams> = new EventEmitter<ProductSearchParams>();

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

  search(searchParams: ProductSearchParams): Observable<Product[]> {
    return this.http.get('/api/products', { search: this.encodeParams(searchParams) }).map(res => res.json());
  }

  // mapper for mapping searchParams type -> URLSearchParams
  private encodeParams(searchParams: ProductSearchParams): URLSearchParams {
    return Object.keys(searchParams)
      .filter(key => searchParams[key])
      .reduce((sum: URLSearchParams, key: string) => {
        sum.append(key, searchParams[key]);
        return sum;
      }, new URLSearchParams());
  }

}


export class ProductSearchParams {
  constructor(public title: string,
    public price: number,
    public category: string) { }
}
