import websocketRepository from "../infra/WebSocketRepository";
import { ChatData } from "../infra/ChatData";
import { AudienceMessage } from "./AudienceMessage";
import Queue from "./Queue";
import WindowInjection from "../infra/WindowInjection";

type ChatMessageHandler = (data: ChatData) => void;
type RoomMessageHandler = (data: AudienceMessage) => void;
type StringMap<T> = { [x: string]: T } & {};

class WebSocketEvent {
  private knownWebSockets: WebSocket[] = [];

  private chatMessageQueue = new Queue<ChatData>();
  private roomMessageQueue = new Queue<AudienceMessage>();

  private chatOnMessageHandlers: ChatMessageHandler[] = [];
  private roomOnMessageHandlers: RoomMessageHandler[] = [];

  constructor() {
    this.init();
  }

  private init() {
    this.knownWebSockets = websocketRepository.sockets;
    this.knownWebSockets.forEach(ws => {
      this.registerWebSocket(ws);
    });
    websocketRepository.addOnPushWebSocketEventHandler(ws => {
      this.knownWebSockets.push(ws);
      this.registerWebSocket(ws);
    });
  }

  public addChatOnMessageHandler(handler: ChatMessageHandler) {
    this.chatOnMessageHandlers.push(handler);
    // メッセージキューにデータがあれば適用する
    if (this.chatMessageQueue.length > 0) {
      this.chatMessageQueue.forEach(v => {
        this.chatOnMessageHandlers.forEach(h => h(v));
      });
    }
  }

  public addRoomOnMessageHandler(handler: RoomMessageHandler) {
    this.roomOnMessageHandlers.push(handler);
    // メッセージキューにデータがあれば適用する
    if (this.roomMessageQueue.length > 0) {
      this.roomMessageQueue.forEach(v => {
        this.roomOnMessageHandlers.forEach(h => h(v));
      });
    }
  }

  private registerWebSocket(ws: WebSocket) {
    if (ws.url.indexOf("ws://a.live2.nicovideo.jp") >= 0) {
      ws.addEventListener("message", e => {
        this.onRoomEvent(e);
      });
    } else if (
      ws.url.search(/ws:\/\/o?msg\d{3}\.live\.nicovideo\.jp:?\d*\/websocket/) >=
      0
    ) {
      ws.addEventListener("message", e => {
        this.onChatEvent(e);
      });
    }
  }

  private onChatEvent(e: MessageEvent) {
    const data = JSON.parse(e.data);
    const { chat } = data;
    if (chat == null) {
      return;
    }
    // 振り分けるイベントハンドラがない場合はキューに溜めておく
    if (this.chatOnMessageHandlers.length === 0) {
      this.chatMessageQueue.enqueue(chat);
    }
    this.chatOnMessageHandlers.forEach(handler => handler(chat));
  }

  private onRoomEvent(e: MessageEvent) {
    const data = JSON.parse(e.data);
    // 振り分けるイベントハンドラがない場合はキューに溜めておく
    if (this.roomOnMessageHandlers.length === 0) {
      this.roomMessageQueue.enqueue(data);
    }
    this.roomOnMessageHandlers.forEach(handler => handler(data));
  }
}

const key = "WebSocketEvent";
if (!WindowInjection.contains(key)) {
  WindowInjection.setObject(key, new WebSocketEvent());
}

const webSocketEvent = WindowInjection.getObject<WebSocketEvent>(key)!;

export default webSocketEvent;
