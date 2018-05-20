type OnPushWebSocketHandler = ((ws: WebSocket) => void);

class WebSocketRepository {
  private websockets: WebSocket[] = [];

  private onPushWebSocketHandlers: OnPushWebSocketHandler[] = [];

  public addWebSocket(websocket: WebSocket) {
    // if (
    //   this.websockets.length > 0 &&
    //   this.websockets.findIndex(ws => ws.url === websocket.url) >= 0
    // ) {
    //   debugger;
    //   return;
    // }

    this.websockets.push(websocket);
    this.onPushWebSocketHandlers.forEach(handler => handler(websocket));
  }

  public addOnPushWebSocketEventHandler(handler: OnPushWebSocketHandler) {
    this.onPushWebSocketHandlers.push(handler);
  }

  public get sockets() {
    return this.websockets;
  }
}

const websocketRepository = new WebSocketRepository();
export default websocketRepository;
