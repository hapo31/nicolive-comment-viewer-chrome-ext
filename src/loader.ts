// ページのwindowオブジェクトを取得するため、拡張機能のスクリプトを読み込むscriptタグをページに埋め込む
if (chrome) {
  const injectScriptName = "inject.js";
  const injectScriptElem = document.createElement("script");
  const workerScriptElem = document.createElement("script");
  const workerScriptUrl = chrome.extension.getURL("worker.js");
  const scriptURL = chrome.extension.getURL("script.js");

  workerScriptElem.setAttribute("src", workerScriptUrl);

  injectScriptElem.setAttribute("id", "nicolive-commentviewer-extenstion");
  injectScriptElem.setAttribute(
    "src",
    chrome.extension.getURL(injectScriptName)
  );
  injectScriptElem.setAttribute("data-script-url", scriptURL);
  document.documentElement.appendChild(injectScriptElem);
  document.documentElement.appendChild(workerScriptElem);
}
