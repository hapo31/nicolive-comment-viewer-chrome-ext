import { observable, action, computed, toJS, runInAction } from "mobx";
import { Chat } from "../model/Chat";
import LiveGetThreadsClient from "../infra/LiveGetThreadsClient";
import nicoLiveData from "../infra/NicoLiveData";
import ThreadStore from "./ThreadStore";
import { CommandType, AudienceMessage } from "../model/AudienceMessage";
import { ChatData } from "../infra/ChatData";
import webSocketEvent from "../model/WebSocketEvent";
import { MessageServerInfo } from "../infra/LiveGetThreadsClient";

export type OnReceiveHanlder = (chatData: Partial<Chat>) => void;

export default class CommentViewerStore {
  @observable public threadStoreList: ThreadStore[] = [];
  @observable private isBroadcaster: boolean = true;
  @observable public appStartDate: Date = new Date();

  private onReceiveHandlers: OnReceiveHanlder[] = [];

  constructor(prop?: Partial<CommentViewerStore>) {
    if (prop) {
      Object.assign(this, prop);
    }
  }

  @action.bound
  public async connectMessageServer() {
    // とりあえず取りに行ってみる
    const liveId = this.getLiveId();
    const wsEvent = webSocketEvent;
    try {
      const msList = await LiveGetThreadsClient.fetch(liveId);
      this.createThreadFromMessageServerList(msList);
    } catch (e) {
      // 視聴者の場合は部屋情報からThread情報を取得するようにする
      wsEvent.addRoomOnMessageHandler(data =>
        this.createThreadFromMessage(data)
      );
    }
    // コメント受信時の処理
    wsEvent.addChatOnMessageHandler(data => this.appendChatData(data));
  }

  @action.bound
  private pushChatData(chatData: ChatData) {
    // 受信したデータと一致するスレッドIDをメンバのThreadオブジェクトリストから探す
    const threadIndex = this.threadStoreList.findIndex(
      v => v.threadId === chatData.thread
    );
    if (threadIndex >= 0) {
      // 受信データを内部に追加
      const thread = this.threadStoreList[threadIndex];
      thread.pushChatData(chatData);
      return thread.lastChat!;
    } else {
      // 見つからなかった場合は新たにスレッドを作成
      const thread = new ThreadStore({
        roomName: `id: ${chatData.thread}`,
        threadId: chatData.thread
      });
      this.threadStoreList.push(thread);
      thread.pushChatData(chatData);
      return thread.lastChat!;
    }
  }

  public addOnReceiveHandler(handler: OnReceiveHanlder) {
    this.onReceiveHandlers.push(handler);
  }

  private getLiveId() {
    const paths = location.href.split("/");
    return paths[paths.length - 1];
  }

  @action.bound
  private createThreadFromMessage(info: AudienceMessage) {
    if (
      info.type === "watch" &&
      info.body.command === CommandType.CURRENTROOM
    ) {
      const { room } = info.body;
      // まだ一つもコメントを受信していなければ、メッセージからデータを取得
      if (this.threadStoreList.length === 0) {
        console.log("create room:" + room.roomName);
        this.threadStoreList = [
          new ThreadStore({
            threadId: parseInt(room.threadId, 10),
            roomName: room.roomName
          })
        ];
      } else {
        console.log("assign room: " + room.roomName);
        const threadId = parseInt(room.threadId, 10);
        const index = this.threadStoreList.findIndex(
          thread => thread.threadId === threadId
        );
        // （タイミング的に無いと思うけど）すでにスレッド情報が作られていればそのスレッドに名前を割り当てる
        this.threadStoreList[index].roomName = room.roomName;
      }
      console.log("room info acquired");
    }
  }

  @action.bound
  private createThreadFromMessageServerList(msList: MessageServerInfo[]) {
    this.threadStoreList = msList.map(
      v => new ThreadStore({ threadId: v.thread })
    );
  }

  @action.bound
  private appendChatData(chatData: ChatData) {
    const chat = this.pushChatData(chatData);
    // 拡張機能が起動したあとに受信したコメントのみハンドリングする
    if (this.appStartDate <= chat.date) {
      this.onReceiveHandlers.forEach(handler => {
        // コールバックの呼び出し
        handler(chat);
      });
    }
  }
}
