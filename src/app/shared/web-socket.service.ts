import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Server } from 'ws';
@Injectable()
export class WebSocketService {

  ws: WebSocket;
  constructor() {

  }

  createWebSocketObservable(url: string, pid: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event),
          this.ws.onerror = (event) => observer.error(event),
          this.ws.onclose = () => observer.complete(),
          this.ws.onopen = () => this.sendMessage({ productId: pid })
      }
    );
  }

  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}
