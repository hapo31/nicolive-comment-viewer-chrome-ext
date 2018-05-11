import { ChatData } from "./Chat";
import NicoLiveThreadRequest from "./NicoLiveThreadRequest";
import nicoLiveData from "./NicoLiveData";

export default class CommentServerClient implements CommentServerClient {
  private retryCount = 0;
  constructor(
    public addr: string,
    public port: number,
    public threadId: number
  ) {}

  public connect = (callback: (data: ChatData) => void) => {
    const conn = new WebSocket(`ws://${this.addr}:${this.port}/websocket`, [
      "msg.nicovideo.jp#json"
    ]);
    conn.onopen = _ => {
      const userId = nicoLiveData.user.id;
      this.retryCount = 0;
      console.log(`コメントサーバーに接続しました。`);
      conn.send(NicoLiveThreadRequest.createPayload(this.threadId, userId));
    };
    conn.onmessage = e => {
      const { chat } = JSON.parse(e.data);
      if (chat) {
        callback(chat);
      }
    };

    conn.onclose = _ => {
      this.retryCount++;
      if (this.retryCount <= 3) {
        console.log(
          `[${this.threadId}] コメントサーバーから切断されました。${3 *
            this.retryCount}秒後に再接続します...`
        );
        setTimeout(this.connect, 3000 * this.retryCount, callback);
      } else {
        console.error("コメントサーバーへの接続に失敗しました…。");
      }
    };
  };
}
