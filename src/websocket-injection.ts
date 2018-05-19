import { WebSocketRepository } from "./model/PageWebSocketRepository";
const pageWebsocketRepository: WebSocketRepository = (window as any)
  .pageWebsocketRepository;

// アプリケーションのWebSocketをフックし、生成した全てのWebSocketをRepositoryに保存する
(window as any).WebSocket = new Proxy(WebSocket, {
  construct(target: any, args: any[]) {
    const ws = new target(...args);
    pageWebsocketRepository.addWebSocket(ws);
    return ws;
  }
});
