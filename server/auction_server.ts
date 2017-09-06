import * as express from 'express';
import { Server } from 'ws';
import 'rxjs/Rx';

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
});

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

  if (params.category && result.length > 0 && params.category !== '-1') {
    result = result.filter(p => p.category.indexOf(params.category) !== -1);
  }
  res.json(result);

});

server.get('/api/product/:id', (req, res) => {
  res.json(products.find(product => product.id == +req.params.id));
});

server.get('/api/product/:id/comments', (req, res) => {
  res.json(comments.filter(comment => comment.productId == +req.params.id));
});

server.get('/api/categories', (req, res) => {
  res.json(categorys);
});

server.listen(8085, () => {
  console.log('express starting in http://localhost:8085');
});

const ws = new Server({ port: 8089 });
const subscriptions = new Map<any, number[]>();

ws.on('connection', (client) => {
  console.log('this is connected');
  client.on('message', (websocket: string) => {
    let productObj = JSON.parse(websocket);
    // let us get the list of productIds that subscribe by this client
    let productIds = subscriptions.get(client) || [];
    // add the new id to our productIds via the client
    subscriptions.set(client, [...productIds, productObj.productId]);
    console.log(websocket);
  });
});

ws.on('closed', () => {
  console.log('this is closed');
});

// store each products new bid, for key is the productId, the value is the new bid
const currentBids = new Map<number, number>();

setInterval(() => {
  // for testing purpose we will genenerate the bids manually
  products.forEach(p => {
    // get the currentBid for this product in our currentBids Map
    let currentBid = currentBids.get(p.id) || p.price;
    let newBid = currentBid * Math.random() * 5;
    currentBids.set(p.id, newBid);
  });

  // we going to send to our observer
  subscriptions.forEach((productIds, clientWs: WebSocket) => {
    let newBids = productIds.forEach(p => {
      return {
        productId: p,
        currentBid: currentBids.get(p)
      };
    });
    console.log(newBids);
    clientWs.send(newBids);
  });
}, 2000);
