import { AudienceMessage } from "./AudienceMessage";
import pageWebsocketRepository from "./PageWebSocketRepository";

type AudienceMessageHandler = (data: AudienceMessage) => void;

const serverHint = "ws://a.live2.nicovideo.jp";

export default class RoomInfomationClient {
  private onReceiceMessage?: AudienceMessageHandler;

  public observe = (callback: AudienceMessageHandler) => {
    this.onReceiceMessage = callback;
    const sockets = pageWebsocketRepository.sockets;
    // 初期化段階ではまだメッセージサーバーへの接続を開始していない事が多いため、
    // 新たにWebSocketが追加されるタイミングを監視し、
    // そのWebSocketの接続先がメタデータサーバーだった場合はイベントリスナを登録するようにする
    if (sockets.findIndex(ws => ws.url.includes(serverHint)) < 0) {
      pageWebsocketRepository.addOnPushWebSocketEventHandler(ws => {
        if (ws.url.includes(serverHint)) {
          ws.addEventListener("message", this.onMessage);
        }
      });
    } else {
      // メタデータサーバーへ接続済みであれば、
      // メタデータサーバーへ接続しているWebSocketに対して直接イベントリスナを追加する
      sockets.filter(ws => ws.url.includes(serverHint)).forEach(ws => {
        ws.addEventListener("message", this.onMessage);
      });
    }
  };

  public dispose() {
    this.onReceiceMessage = undefined;
  }

  private onMessage = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
    if (data && this.onReceiceMessage) {
      this.onReceiceMessage(data);
    }
  };
}
