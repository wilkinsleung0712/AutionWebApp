import { ProductService } from './../shared/product.service';
import { Product, Comment } from './../model/model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  comments: Comment[];

  constructor(private routeInfo: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    // we can get productId form our routeInfo
    let productId: number = this.routeInfo.snapshot.params['prodId'];
    // then we get the product
    this.product = this.productService.getProduct(productId);
    this.comments = this.productService.getProductComments(productId);

    console.log(this.product);
  }

}
