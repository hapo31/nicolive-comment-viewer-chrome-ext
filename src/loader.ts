// ページのwindowオブジェクトを取得するため、拡張機能のスクリプトを読み込むscriptタグをページに埋め込む
if (chrome) {
  const scriptName = "inject.js";
  const scriptElem = document.createElement("script");
  const scriptURL = chrome.extension.getURL("script.js");

  scriptElem.setAttribute("id", "nicolive-commentviewer-extenstion");
  scriptElem.setAttribute("src", chrome.extension.getURL(scriptName));
  scriptElem.setAttribute("data-script-url", scriptURL);
  document.documentElement.appendChild(scriptElem);
}
