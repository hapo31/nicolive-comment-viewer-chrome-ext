/**
 * watch.* で始まるgetthreadsAPIからスレッド情報を取得する
 * CORSの関係で視聴ページからは叩くことが出来ない
 */
export default class WatchLiveGetThreads {
  static async fetch(liveId: string) {
    return new Promise<MessageServerInfo[]>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `http://watch.live.nicovideo.jp/api/getthreads?v=${liveId}`
      );
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const res = xhr.responseXML;
            if (res) {
              const msElements = res.querySelectorAll("mslist > ms");
              // mslist要素の下のmsにメッセージサーバーへの情報が格納されているのでパースする
              const msList: MessageServerInfo[] = Array.from(msElements).map(
                ms => {
                  return {
                    addr: ms.querySelector("addr")!.textContent!,
                    port: parseInt(ms.querySelector("port")!.textContent!, 10),
                    thread: parseInt(
                      ms.querySelector("thread")!.textContent!,
                      10
                    )
                  };
                }
              );
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
