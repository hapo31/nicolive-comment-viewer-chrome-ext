import { observable, action } from "mobx";
import { Thread, ChatData } from "../model/Chat";
import CommentServerClient from "../model/CommentServerClient";
import GetPlayerStatusClient from "../model/GetPlayerStatusClient";

export default class CommentViewerStore {
  @observable public threads: Thread[] = [];

  public commentServerClients: CommentServerClient[] = [];

  constructor(prop?: Partial<CommentViewerStore>) {
    if (prop) {
      Object.assign(this, prop);
    }
  }

  @action.bound
  public async connectMessageServer() {
    const liveId = this.getLiveId();
    const msList = await GetPlayerStatusClient.fetch(liveId);
    this.commentServerClients = msList.map(
      v => new CommentServerClient(v.addr, v.port, v.thread)
    );
    this.commentServerClients.forEach(v => {
      v.connect(chatData => this.onReceiveChat(chatData));
    });
  }

  @action.bound
  private onReceiveChat(chatData: ChatData) {
    // // 受信したデータと一致するスレッドIDをメンバのThreadオブジェクトリストから探す
    // const threadIndex = this.threads.findIndex((v) => v.id === chatData.thread);
    // if (threadIndex >= 0) {
    // } else {
    //   // 見つからなかった場合は新たにスレッドを作成
    // }
  }

  private getLiveId() {
    const paths = location.href.split("/");
    return paths[paths.length - 1];
  }
}
