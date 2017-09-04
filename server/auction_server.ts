import * as express from 'express';

// our data structure for server side
export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public category: Array<string>
  ) { }
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) { }
}

const products: Product[] = [
  new Product(1, 'Iphone7', 850, 4.5, 'design by apple', ['phone']),
  new Product(2, 'Note8', 910, 3, 'design by samsung', ['phone']),
  new Product(3, 'M7', 450, 4.5, 'design by xiaomi', ['phone']),
  new Product(4, 'S8', 650, 2, 'design by sony', ['phone']),
  new Product(5, 'Iphone7 Plus', 1120, 1, 'design by apple', ['phone'])
]

const comments: Comment[] = [
  new Comment(1, 1, '2017-02-02 22:22:22', 'Jay', 3, 'things good!'),
  new Comment(2, 1, '2017-02-02 22:22:22', 'Ken', 3, 'things good!'),
  new Comment(3, 1, '2017-02-02 22:22:22', 'Allen', 3, 'things good!'),
  new Comment(4, 1, '2017-02-02 22:22:22', 'Bob', 3, 'things good!'),
]

const categorys: string[] = ['Phone', 'Computer', 'Book'];

const server = express();

server.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

server.get('/api/products', (req, res) => {
  let result = products;
  let params = req.query;
  
  console.log(params);
  if (params.title) {
    result = result.filter(p => p.title.indexOf(params.title) !== -1);
  }

  if (params.price && result.length > 0) {
    result = result.filter(p => p.price <= params.price);
  }

  if (params.category && result.length > 0) {
    result = result.filter(p => p.category.indexOf(params.category) !== -1);
  }
  res.json(result);

})

server.get('/api/product/:id', (req, res) => {
  res.json(products.find(product => product.id == +req.params.id));
})

server.get('/api/product/:id/comments', (req, res) => {
  res.json(comments.filter(comment => comment.productId == +req.params.id));
})

server.get('/api/categories', (req, res) => {
  res.json(categorys);
})

server.listen(8085, () => {
  console.log('express starting in http://localhost:8085');
});
