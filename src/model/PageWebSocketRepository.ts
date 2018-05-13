class WebSocketRepository {
  private websockets: WebSocket[] = [];

  public onPushWebSocket?: (ws: WebSocket) => void;

  public addWebSocket(websocket: WebSocket) {
    this.websockets.push(websocket);
    if (this.onPushWebSocket != null) {
      this.onPushWebSocket(websocket);
    }
  }

  public get sockets() {
    return this.websockets;
  }
}

const pageWebsocketRepository = new WebSocketRepository();
export default pageWebsocketRepository;
