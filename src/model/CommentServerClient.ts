import { ChatData } from "./Chat";
import NicoLiveThreadRequest from "./NicoLiveThreadRequest";
import nicoLiveData from "./NicoLiveData";
import websocketRepository from "./PageWebSocketRepository";

type ChatDataHandler = (data: ChatData) => void;
const serverHint = "msg";

export default class CommentServerClient {
  /**
   * アプリのコメントサーバー接続用WebSocketにイベントリスナを追加する
   */
  public observe = (callback: ChatDataHandler) => {
    const sockets = websocketRepository.sockets;
    // 初期化段階ではまだメッセージサーバーへの接続を開始していない事が多いため、
    // 新たにWebSocketが追加されるタイミングを監視し、
    // そのWebSocketの接続先がコメントサーバーだった場合はイベントリスナを登録するようにする
    websocketRepository.addOnPushWebSocketEventHandler(ws => {
      if (ws.url.includes(serverHint)) {
        ws.addEventListener("message", this.onMessage(callback));
      }
    });

    websocketRepository.addOnChangeWebSocketEventHandler(ws => {
      if (ws.url.includes(serverHint)) {
        ws.addEventListener("message", this.onMessage(callback));
      }
    });

    // コメントサーバーへ接続済みであれば、
    // メッセージサーバーへ接続しているWebSocketに対して直接イベントリスナを追加する
    if (sockets.findIndex(ws => ws.url.includes(serverHint)) >= 0) {
      sockets.filter(ws => ws.url.includes(serverHint)).forEach(ws => {
        ws.addEventListener("message", this.onMessage(callback));
      });
    }
  };

  private onMessage(callback?: ChatDataHandler): (e: MessageEvent) => void {
    return (e: MessageEvent) => {
      const { chat } = JSON.parse(e.data);
      if (chat && callback) {
        callback(chat);
      }
    };
  }
}
