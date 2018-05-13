// ページのwindowオブジェクトを取得するため、拡張機能のスクリプトを読み込むscriptタグをページに埋め込む
if (chrome) {
  const scriptName = "script.js";
  const scriptElem = document.createElement("script");

  scriptElem.setAttribute("src", chrome.extension.getURL(scriptName));
  document.documentElement.appendChild(scriptElem);
}
