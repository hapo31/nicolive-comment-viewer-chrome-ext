type OnPushWebSocketHandler = ((ws: WebSocket) => void);

class WebSocketRepository {
  private websockets: WebSocket[] = [];

  private onPushWebSocketHandlers: OnPushWebSocketHandler[] = [];

  public addWebSocket(websocket: WebSocket) {
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

const pageWebsocketRepository = new WebSocketRepository();
export default pageWebsocketRepository;
