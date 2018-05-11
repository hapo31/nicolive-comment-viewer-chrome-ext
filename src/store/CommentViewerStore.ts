import { observable, action, computed } from "mobx";
import { Chat, ChatData } from "../model/Chat";
import CommentServerClient from "../model/CommentServerClient";
import LiveGetThreadsClient from "../model/LiveGetThreadsClient";
import nicoLiveData from "../model/NicoLiveData";
import ICommentServerClient from "../model/ICommentServerClient";
import ThreadStore from "./ThreadStore";

export type OnReceiveHanlder = (chatData: Partial<Chat>) => void;

export default class CommentViewerStore {
  @observable private threads: ThreadStore[] = [];
  @observable public appStartDate: Date = new Date();
  @observable public isBroadcaster: boolean = true;

  public commentServerClients: ICommentServerClient[] = [];

  private onReceiveHandlers: OnReceiveHanlder[] = [];

  constructor(prop?: Partial<CommentViewerStore>) {
    if (prop) {
      Object.assign(this, prop);
    }
  }

  @computed
  public get threadList() {
    return this.threads;
  }

  @action.bound
  public async connectMessageServer() {
    const liveId = this.getLiveId();
    if (nicoLiveData) {
      // 配信者かどうか
      this.isBroadcaster = nicoLiveData.user.isBroadcaster;
      if (this.isBroadcaster) {
        // 配信者の場合はAPIから全てのコメントサーバーの情報を取得する
        const msList = await LiveGetThreadsClient.fetch(liveId);
        this.threads = msList.map(v => new ThreadStore({ threadId: v.thread }));
        // メッセージサーバーの一覧からコメントサーバーに接続するための情報を生成する
        this.commentServerClients = msList.map(
          v => new CommentServerClient(v.addr, v.port, v.thread)
        );
        this.commentServerClients.forEach(v => {
          // 接続しに行く
          // コールバックの登録もする
          v.connect(chatData => {
            const chat = this.pushChatData(chatData);
            // 拡張機能が起動したあとに受信したコメントのみハンドリングする
            if (this.appStartDate <= chat.date) {
              this.onReceiveHandlers.forEach(handler => {
                // コールバックの呼び出し
                handler(chat);
              });
            }
          });
        });
      }
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

  @action.bound
  private pushChatData(chatData: ChatData) {
    // 受信したデータと一致するスレッドIDをメンバのThreadオブジェクトリストから探す
    const threadIndex = this.threads.findIndex(
      v => v.threadId === chatData.thread
    );
    if (threadIndex >= 0) {
      // 受信データを内部に追加
      const thread = this.threads[threadIndex];
      thread.pushChatData(chatData);
      return thread.lastChat!;
    } else {
      // 見つからなかった場合は新たにスレッドを作成
      const thread = new ThreadStore({ threadId: chatData.thread });
      thread.pushChatData(chatData);
      this.threads.push(thread);
      return thread.lastChat!;
    }
  }

  private getLiveId() {
    const paths = location.href.split("/");
    return paths[paths.length - 1];
  }
}
