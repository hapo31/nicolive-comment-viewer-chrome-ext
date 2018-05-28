import webSocketEvent from "./model/WebSocketEvent";
import websocketRepository from "./infra/WebSocketRepository";
import * as React from "react";
import { render } from "react-dom";
import "tslib";
import RootComponent from "./component/RootComponent";

console.log("ニコ生コメントビューワー ver 0.1");

(() => {
  console.log("コメントビューワーの初期化を開始");
  const app = document.createElement("div");
  app.className = "comment-viewer-ext";
  setTimeout(initExtension, 100, app);
})();

function initExtension(app: HTMLElement) {
  const playerBody = document.querySelector(".___player-body-area___3aMT1");

  if (playerBody) {
    playerBody.appendChild(app);
    render(<RootComponent />, app);
    console.log("コメントビューワーの初期化完了");
  } else {
    console.log("対象のDOMが見つからなかったので、初期化を遅延させます");
    setTimeout(initExtension, 3000, app);
  }
}
