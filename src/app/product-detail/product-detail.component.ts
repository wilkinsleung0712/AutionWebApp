import { ProductService } from './../shared/product.service';
import { Product, Comment } from './../model/model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../shared/web-socket.service';
import { Subscription } from "rxjs/Rx";

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
  isWatched: boolean = false;
  currentBid: number = 0;

  subscription: Subscription;

  constructor(private routeInfo: ActivatedRoute, private productService: ProductService, private webSocketService: WebSocketService) { }

  ngOnInit() {
    // we can get productId form our routeInfo
    let productId: number = this.routeInfo.snapshot.params['prodId'];
    // then we get the product
    this.productService.getProduct(productId).subscribe(product => this.product = product);
    this.productService.getProductComments(productId).subscribe(comments => this.comments = comments);

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
    let sumResult = this.comments.reduce((sum, eachcomment) => sum = sum + eachcomment.rating, 0);
    this.product.rating = sumResult / this.comments.length;
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

  watchProduct() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
    } else {
      this.isWatched = true;
      this.subscription = this.webSocketService.createWebSocketObservable(
        'ws://localhost:8089',
        this.product.id
      ).subscribe(
        products => {
          let product = products.find(product => product.productId === this.product.id);
          this.currentBid = product.newBid;
        }
        );
    }


  }
}
