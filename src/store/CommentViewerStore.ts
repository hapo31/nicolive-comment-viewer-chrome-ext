import { observable, action } from "mobx";
import { Thread, ChatData } from "../model/Chat";
import CommentServerClient from "../model/CommentServerClient";
import LiveGetPlayerStatusClient from "../model/LiveGetPlayerStatusClient";
import nicoLiveData from "../model/NicoLiveData";
import ICommentServerClient from "../model/ICommentServerClient";
import AudienceCommentServerClient from "../model/AudienceCommentServerClient";

export default class CommentViewerStore {
  @observable public threads: Thread[] = [];
  @observable public isBroadcaster: boolean = true;

  public commentServerClients: ICommentServerClient[] = [];

  constructor(prop?: Partial<CommentViewerStore>) {
    if (prop) {
      Object.assign(this, prop);
    }
  }

  @action.bound
  public async connectMessageServer() {
    const liveId = this.getLiveId();
    if (nicoLiveData) {
      // 配信者かどうか
      this.isBroadcaster = nicoLiveData.user.isBroadcaster;
      if (this.isBroadcaster) {
        // 配信者の場合はAPIから全てのコメントサーバーの情報を取得する
        const msList = await LiveGetPlayerStatusClient.fetch(liveId);
        this.threads = msList.map(v => new Thread(v.thread));
        // メッセージサーバーの一覧からコメントサーバーに接続するための情報を生成する
        this.commentServerClients = msList.map(
          v => new CommentServerClient(v.addr, v.port, v.thread)
        );
        this.commentServerClients.forEach(v => {
          // 接続しに行く
          // コールバックの登録もする
          v.connect(chatData => this.onReceiveChat(chatData));
        });
      } else {
        const audienceCommentServerClient = new AudienceCommentServerClient(
          nicoLiveData.site.relive.webSocketUrl
        );
        // 視聴者の場合は、現在プレイヤーが接続しているメッセージサーバーに接続する
        audienceCommentServerClient.connect(chatData =>
          this.onReceiveChat(chatData)
        );
        this.commentServerClients.push(audienceCommentServerClient);
      }
    }
  }

  @action.bound
  private onReceiveChat(chatData: ChatData) {
    // 受信したデータと一致するスレッドIDをメンバのThreadオブジェクトリストから探す
    const threadIndex = this.threads.findIndex(v => v.id === chatData.thread);
    if (threadIndex >= 0) {
      // 受信データを内部に追加
      const thread = this.threads[threadIndex];
      thread.pushChatData(chatData);
    } else {
      // 見つからなかった場合は新たにスレッドを作成
      const thread = new Thread(chatData.thread);
      thread.pushChatData(chatData);
      this.threads.push(thread);
    }
  }

  private getLiveId() {
    const paths = location.href.split("/");
    return paths[paths.length - 1];
  }
}
