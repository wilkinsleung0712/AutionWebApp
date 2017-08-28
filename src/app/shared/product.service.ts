import { Injectable } from "@angular/core";
import { Product, Comment } from '../model/product';

@Injectable()
export class ProductService {
    private products: Product[] = [
        new Product(1, 'Iphone7', 850, 4.5, 'design by apple', ['phone']),
        new Product(2, 'Note8', 910, 3, 'design by samsung', ['phone']),
        new Product(3, 'M7', 450, 4.5, 'design by xiaomi', ['phone']),
        new Product(4, 'S8', 650, 2, 'design by sony', ['phone']),
        new Product(5, 'Iphone7 Plus', 1120, 1, 'design by apple', ['phone'])
    ]

    private comments: Comment[] = [
        new Comment(1, 1, '2017-02-02 22:22:22', 'Jay', 3, 'things good!'),
        new Comment(2, 1, '2017-02-02 22:22:22', 'Ken', 3, 'things good!'),
        new Comment(3, 1, '2017-02-02 22:22:22', 'Allen', 3, 'things good!'),
        new Comment(4, 1, '2017-02-02 22:22:22', 'Bob', 3, 'things good!'),
    ]

    getProducts(){
        return this.products;
    }

    getComments(){
        return this.comments;
    }
}