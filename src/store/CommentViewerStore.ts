import { observable, action, computed, toJS, runInAction } from "mobx";
import { Chat, ChatData } from "../model/Chat";
import CommentServerClient from "../model/CommentServerClient";
import LiveGetThreadsClient from "../infra/LiveGetThreadsClient";
import nicoLiveData from "../infra/NicoLiveData";
import ICommentServerClient from "../infra/ICommentServerClient";
import ThreadStore from "./ThreadStore";
import RoomInfomationClient from "../model/RoomInfomationClient";
import { CommandType, AudienceMessage } from "../model/AudienceMessage";

export type OnReceiveHanlder = (chatData: Partial<Chat>) => void;

export default class CommentViewerStore {
  @observable public threadStoreList: ThreadStore[] = [];
  @observable private isBroadcaster: boolean = true;
  @observable public appStartDate: Date = new Date();

  private commentServerClient: CommentServerClient = new CommentServerClient();
  private roomInformationClient: RoomInfomationClient = new RoomInfomationClient();
  private onReceiveHandlers: OnReceiveHanlder[] = [];

  constructor(prop?: Partial<CommentViewerStore>) {
    if (prop) {
      Object.assign(this, prop);
    }
  }

  @action.bound
  public async connectMessageServer() {
    // 配信者かどうか
    const embeddedData = nicoLiveData.embeddedData;
    if (embeddedData != null && embeddedData.user.isBroadcaster) {
      this.isBroadcaster = embeddedData.user.isBroadcaster;

      // 配信者の場合はAPIから全てのコメントサーバーの情報を取得する
      const liveId = this.getLiveId();
      const msList = await LiveGetThreadsClient.fetch(liveId);
      this.threadStoreList = msList.map(
        v => new ThreadStore({ threadId: v.thread })
      );
    } else {
      // 視聴者の場合は部屋情報が取得されるまで待つ
      this.roomInformationClient.observe(info => {
        this.createThreadFromMessage(info);
      });
    }

    // コールバックの登録
    this.commentServerClient.observe(chatData => {
      this.appendChatData(chatData);
    });
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
      const thread = new ThreadStore({ threadId: chatData.thread });
      this.threadStoreList.push(thread);
      thread.pushChatData(chatData);
      return thread.lastChat!;
    }
  }

  public addOnReceiveHandler(handler: OnReceiveHanlder) {
    this.onReceiveHandlers.push(handler);
  }

  public removeOnReceiveHandler(handler: OnReceiveHanlder) {
    const index = this.onReceiveHandlers.findIndex(
      instance => instance === handler
    );
    if (index >= 0) {
      this.onReceiveHandlers.splice(index, 1);
    }
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
        // TODO: たぶんここの扱いがまずいんだと思うのでThreadStoreを修正する
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
      this.roomInformationClient.dispose();
      console.log("room info acquired");
    }
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
