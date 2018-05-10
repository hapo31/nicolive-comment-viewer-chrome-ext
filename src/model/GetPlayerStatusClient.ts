export default class GetPlayerStatusClient {
  static async fetch(liveId: string) {
    return new Promise<MessageServerInfo[]>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `http://live.nicovideo.jp/api/getthreads?v=${liveId}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const res = xhr.responseXML;
            if (res) {
              const threadElements = res.querySelectorAll("thread");
              // thread要素にメッセージサーバーへの情報が格納されているのでパースする
              const msList: MessageServerInfo[] = Array.from(
                threadElements
              ).map(v => {
                const url = v.querySelector("server > url")!.textContent!;
                const paths = url.split("/");
                const [addr, port] = paths[2].split(":");
                return {
                  addr,
                  port: parseInt(port, 10),
                  thread: parseInt(v.getAttribute("id")!, 10)
                };
              });
              resolve(msList);
            }
          } else {
            reject();
          }
        }
      };
      xhr.send();
    });
  }
}

export type MessageServerInfo = {
  addr: string;
  port: number;
  thread: number;
};
