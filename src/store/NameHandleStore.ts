import NameHandle from "../model/NameHandle";
import { observable, action } from "mobx";
import { Chat } from "../model/Chat";

export default class NameHandleStore {
  @observable public handles: NameHandle[] = [];
  // チャットリストにコテハンを適用するときのキャッシュ
  private idCache: { [x: string]: number } = {};

  @action.bound
  public addHandle(name: string, id: string, color: string = "") {
    this.handles.push(new NameHandle(name, id, color));
  }

  @action.bound
  public removeHandle(name: string) {
    const index = this.handles.findIndex(v => v.name === name);

    if (index >= 0) {
      this.handles.splice(index, 1);
    }
  }

  public applyNameHandle(chatList: Chat[]) {
    chatList.map(chat => {
      const index =
        // findIndexの負荷を下げるためにキャッシュからインデックスを取りにいく
        this.idCache[chat.userId] != null
          ? this.idCache[chat.userId]
          : this.handles.findIndex(handle => handle.id === chat.userId);
      if (index >= 0) {
        const handleData = this.handles[index];
        this.idCache[handleData.id] = index;
        return Object.assign(chat, {
          name: handleData.name,
          color: handleData.color
        });
      } else {
        return chat;
      }
    });
  }
}
