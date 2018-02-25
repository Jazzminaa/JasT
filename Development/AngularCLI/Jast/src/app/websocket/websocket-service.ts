import { Injectable } from '@angular/core';
import { Subject, Observer, Observable } from 'rxjs/Rx';
  
@Injectable()
export class WebsocketService{
public createWebsocket(id:number): Subject<MessageEvent> {
        let socket = new WebSocket('ws://vm86.htl-leonding.ac.at:8080/JAST/play/'+id);
        //let socket = new WebSocket('ws://localhost:8080/JAST/play/'+id);
        let observable = Observable.create(
                    (observer: Observer<MessageEvent>) => {
                        socket.onmessage = observer.next.bind(observer);
                        socket.onerror = observer.error.bind(observer);
                        socket.onclose = observer.complete.bind(observer);
                        return socket.close.bind(socket);
                    }
        );
        let observer = {
                next: (data: String) => { //object
                    if (socket.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify(data));
                    }
                }
        };
        return Subject.create(observer, observable);
}
}