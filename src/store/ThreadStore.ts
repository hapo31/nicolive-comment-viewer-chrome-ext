import { observable, action, runInAction, computed, toJS } from "mobx";
import { Chat } from "../model/Chat";
import { ChatData } from "../infra/ChatData";
import filterWorker from "../infra/Worker";

export default class ThreadStore {
  @observable public threadId: number = 0;
  @observable public roomName: string = "-";

  @observable public showCommand = true;
  @observable public showOperatorComment = true;

  @observable public rawChatList: Chat[] = [];
  private chatListCache: ChatData[] = [];
  private timer: number = 0;

  constructor(props?: Partial<ThreadStore>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @computed
  public get chatList() {
    return this.rawChatList.slice(0, 100);
  }

  @action.bound
  public pushChatData(data: ChatData) {
    this.chatListCache.push(data);

    if (this.timer !== 0) {
      clearTimeout(this.timer);
    }
    // 起動時などに一気にコメントが追加されると激重になるので、
    // 自前でデータへの反映にthrottleを掛ける
    this.timer = window.setTimeout(() => {
      filterWorker
        .postMessage({
          raw: toJS(this.rawChatList.map(v => v.data)),
          cache: this.chatListCache,
          config: {
            isShowCommand: this.showCommand,
            isShowOperatorComment: this.showOperatorComment
          }
        })
        .then(list => {
          runInAction(() => {
            debugger;
            this.rawChatList = list.map(v => new Chat(v));
          });
          this.resetCache();
        });
    }, 100);
  }

  public get lastChat() {
    return this.chatListCache.length !== 0
      ? new Chat(this.chatListCache[this.chatListCache.length - 1])
      : null;
  }

  @action.bound
  private resetCache() {
    this.chatListCache = [];
    this.timer = 0;
  }
}
