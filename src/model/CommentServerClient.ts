import { ChatData } from "./Chat";
import NicoLiveThreadRequest from "./NicoLiveThreadRequest";
import nicoLiveData from "./NicoLiveData";
import pageWebsocketRepository from "./PageWebSocketRepository";

export default class CommentServerClient implements CommentServerClient {
  private onReceiceMessage: (data: ChatData) => void = (() => {}) as any;

  /**
   * アプリのコメントサーバー接続用WebSocketにイベントリスナを追加する
   */
  public observe = (callback: (data: ChatData) => void) => {
    const sockets = pageWebsocketRepository.sockets;
    // 初期化段階ではまだメッセージサーバーへの接続を開始していない事が多いため、
    // 新たにWebSocketが追加されるタイミングを監視し、
    // そのWebSocketの接続先がコメントサーバーだった場合はイベントリスナを登録するようにする
    if (sockets.findIndex(ws => ws.url.includes("msg")) < 0) {
      pageWebsocketRepository.onPushWebSocket = ws => {
        if (ws.url.includes("msg")) {
          ws.addEventListener("message", this.onMessage(callback));
        }
      };
    } else {
      // コメントサーバーへ接続済みであれば、
      // メッセージサーバーへ接続しているWebSocketに対して直接イベントリスナを追加する
      sockets.filter(ws => ws.url.includes("msg")).forEach(ws => {
        ws.addEventListener("message", this.onMessage(callback));
      });
    }
  };

  private onMessage(
    callback: (data: ChatData) => void
  ): (e: MessageEvent) => void {
    return (e: MessageEvent) => {
      const { chat } = JSON.parse(e.data);
      if (chat) {
        callback(chat);
      }
    };
  }
}
