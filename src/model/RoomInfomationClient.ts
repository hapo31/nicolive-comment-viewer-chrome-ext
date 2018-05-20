import { AudienceMessage } from "./AudienceMessage";
import websocketRepository from "./PageWebSocketRepository";
import nicoLiveData from "./NicoLiveData";

type RoomInfomationMessageHandler = (data: AudienceMessage) => void;

const serverHint = "ws://a.live2.nicovideo.jp";

export default class RoomInfomationClient {
  private onReceiceMessage?: RoomInfomationMessageHandler;

  private socket?: WebSocket;

  public sendMessage = () => {
    const { embeddedData } = nicoLiveData;
    if (embeddedData) {
      console.log("RoomInfomationClient", this.socket);
      if (this.socket == null) {
        const idx = websocketRepository.sockets.findIndex(
          ws => ws.url.startsWith("ws://") && ws.url.includes("unama")
        );
        if (idx >= 0) {
          this.socket = websocketRepository.sockets[idx];
        } else {
          const url = embeddedData.site.relive.webSocketUrl;
          const token = embeddedData.player.audienceToken;
          this.socket = new WebSocket(`${url}audience_token=${token}`);
        }
      }

      const broadcastId = embeddedData.program.broadcastId;

      const sendData = {
        type: "watch",
        body: {
          command: "getpermit",
          requirement: {
            broadcastId,
            route: "",
            room: {
              isCommentable: true,
              protocol: "webSocket"
            },
            stream: {
              isLowLatency: true,
              priorStreamQuality: "abr",
              protocol: "hls",
              requireNewStream: true
            }
          }
        }
      };
      console.log({ sendData });
      this.socket.send(JSON.stringify(sendData));
    }
  };

  public observe = (callback: RoomInfomationMessageHandler) => {
    this.onReceiceMessage = callback;
    const sockets = websocketRepository.sockets;
    // 初期化段階ではまだメッセージサーバーへの接続を開始していない事が多いため、
    // 新たにWebSocketが追加されるタイミングを監視し、
    // そのWebSocketの接続先がメタデータサーバーだった場合はイベントリスナを登録するようにする
    if (sockets.findIndex(ws => ws.url.includes(serverHint)) < 0) {
      websocketRepository.addOnPushWebSocketEventHandler(ws => {
        if (ws.url.includes(serverHint)) {
          this.socket = ws;
          ws.addEventListener("message", this.onMessage);
        }
      });
    } else {
      // メタデータサーバーへ接続済みであれば、
      // メタデータサーバーへ接続しているWebSocketに対して直接イベントリスナを追加する
      sockets.filter(ws => ws.url.includes(serverHint)).forEach(ws => {
        this.socket = ws;
        ws.addEventListener("message", this.onMessage);
      });
    }
  };

  public dispose() {
    this.onReceiceMessage = undefined;
    if (this.socket) {
      this.socket.close();
    }
  }

  private onMessage = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
    if (data && this.onReceiceMessage) {
      this.onReceiceMessage(data);
    }
  };
}
