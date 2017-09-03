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
  newComment: string = '';
  newRating: number = 5;
  isCommentHidden = true;

  constructor(private routeInfo: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    // we can get productId form our routeInfo
    let productId: number = this.routeInfo.snapshot.params['prodId'];
    // then we get the product
    this.product = this.productService.getProduct(productId);
    this.comments = this.productService.getProductComments(productId);

    console.log(this.product);
  }

  addComment() {
    console.log('add comment clicked');
    console.log(this.newComment);
    let comment = new Comment(
      0,
      this.product.id,
      new Date().toISOString(),
      '',
      this.newRating,
      this.newComment
    );
    this.comments.unshift(comment);
    // here we recalc overall rating
    let sum = this.comments.reduce((sum, comment) => sum = sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;
    // here we reset our data for view
    this.newRating = 5;
    this.newComment = '';
    this.isCommentHidden = true;
  }

  newRatingHandler(event) {
    console.log('new rating');
    console.log(event);
    this.newRating = event;
  }

}
