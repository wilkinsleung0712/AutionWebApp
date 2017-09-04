import { Component, OnInit } from '@angular/core';
import { Product } from '../model/model';
import { ProductService } from '../shared/product.service';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>;
  imageUrl = 'http://placehold.it/320x150';

  keyword: string;
  titleFilter: FormControl = new FormControl();

  constructor(private productService: ProductService) {
    this.titleFilter.valueChanges.debounceTime(500)
      .subscribe(value => {
        this.keyword = value;
      });
  }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
    // subscribe this event emitter event to check if we need to search
    this.productService.productSearchEventEmitter.subscribe(
      params => this.products$ = this.productService.search(params));
  }

}
