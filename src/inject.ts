import websocketRepository from "./infra/PageWebSocketRepository";

// アプリケーションのWebSocketをフックし、生成した全てのWebSocketをRepositoryに保存する
(window as any).WebSocket = new Proxy(WebSocket, {
  construct(target: any, args: any[]) {
    const ws = new target(...args);
    websocketRepository.addWebSocket(ws);
    return ws;
  }
});

// ページのwindowオブジェクトを取得するため、拡張機能のスクリプトを読み込むscriptタグをページに埋め込む
if (chrome) {
  const inject = document.getElementById("nicolive-commentviewer-extenstion");
  if (inject) {
    const scriptName = "script.js";
    const scriptElem = document.createElement("script");
    const url = inject.getAttribute("data-script-url");
    scriptElem.setAttribute("src", url!);
    document.documentElement.appendChild(scriptElem);
  }
}
