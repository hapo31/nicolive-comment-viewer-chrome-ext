import { ChatData } from "./Chat";
import ICommentServerClient from "./ICommentServerClient";

export default class AudienceCommentServerClient
  implements ICommentServerClient {
  private retryCount = 0;
  constructor(public webSocketUrl: string) {}

  public connect = (callback: (data: ChatData) => void) => {
    const conn = new WebSocket(this.webSocketUrl);
    conn.onopen = _ => {
      this.retryCount = 0;
      console.log(`視聴者コメントサーバーに接続しました。`);
    };
    conn.onmessage = e => {
      console.log(e.data);
      if (e.data.chat) {
        callback(e.data.chat);
      }
    };

    conn.onclose = _ => {
      this.retryCount++;
      if (this.retryCount <= 3) {
        console.log(
          `視聴者コメントサーバーから切断されました。${3 *
            this.retryCount}秒後に再接続します...`
        );
        setTimeout(this.connect, 3000 * this.retryCount, callback);
      } else {
        console.error("コメントサーバーへの接続に失敗しました…。");
      }
    };
  };
}
