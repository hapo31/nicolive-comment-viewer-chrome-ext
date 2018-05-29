// ページのwindowオブジェクトを取得するため、拡張機能のスクリプトを読み込むscriptタグをページに埋め込む
if (chrome) {
  const injectScriptName = "inject.js";
  const injectScriptElem = document.createElement("script");
  const scriptURL = chrome.extension.getURL("script.js");

  injectScriptElem.setAttribute("id", "nicolive-commentviewer-extenstion");
  injectScriptElem.setAttribute(
    "src",
    chrome.extension.getURL(injectScriptName)
  );
  injectScriptElem.setAttribute("data-script-url", scriptURL);
  document.documentElement.appendChild(injectScriptElem);
}
