import * as React from "react";
import { render } from "react-dom";
import "tslib";
import RootComponent from "./component/RootComponent";

console.log("ニコ生コメントビューワー ver 0.1");

(() => {
  console.log("コメントビューワーの初期化を開始");
  const app = document.createElement("div");
  app.className = "comment-viewer-ext";
  setTimeout(initExtension, 1000, app);
})();

function initExtension(app: HTMLElement) {
  const playerBody = document.querySelector(
    `div[class*="___player-body-area___"]`
  );
  // 生放送プレイヤーの要素(これが取得できてないのにrenderするとプレイヤーにDOMを上書きされる)
  const player = document.querySelector(`div[class*="___player-display___"]`);

  if (player && playerBody) {
    playerBody.appendChild(app);
    render(<RootComponent />, app);
    console.log("コメントビューワーの初期化完了");
  } else {
    setTimeout(initExtension, 1000, app);
  }
}
