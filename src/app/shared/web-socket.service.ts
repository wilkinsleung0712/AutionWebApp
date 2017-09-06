import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Server } from 'ws';
import 'rxjs/Rx';

@Injectable()
export class WebSocketService {

  ws: WebSocket;
  constructor() {

  }

  createWebSocketObservable(url: string, pid: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
          this.ws.onerror = (event) => observer.error(event);
          this.ws.onclose = () => observer.complete();
          this.ws.onopen = () => this.sendMessage({ productId: pid });
          return () => this.ws.close();
      }

    ).map(message => JSON.parse(message));
    // we will need to map our string back to object, as in here we need to convert object, so we use
    // map keyword again, and map is return an observable object which will fit in here
  }

  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}
