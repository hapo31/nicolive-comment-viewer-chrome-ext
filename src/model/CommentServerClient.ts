import { ChatData } from "./Chat";

export default class CommentServerClient {
  constructor(
    public addr: string,
    public port: number,
    public threadId: number
  ) {}

  public connect = (callback: (data: ChatData) => void) => {
    const conn = new WebSocket(`ws://${this.addr}:${this.port}/websocket`);
    conn.onopen = _ => {
      console.log(`コメントサーバーに接続しました。`);
    };
    conn.onmessage = e => {
      console.log(e.data);
      callback(e.data.chat);
    };

    conn.onclose = _ => {
      console.log("コメントサーバーから切断されました。3秒後に再接続します...");
      setTimeout(this.connect, 3000, callback);
    };
  };
}
