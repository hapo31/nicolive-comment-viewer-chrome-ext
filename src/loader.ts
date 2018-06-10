import Constants from "./constant/constants";

// ページのwindowオブジェクトを取得するため、拡張機能のスクリプトを読み込むscriptタグをページに埋め込む
if (chrome) {
  const injectName = Constants.Filename.InjectScript;
  const injectURL = chrome.extension.getURL(Constants.Filename.ExtensionScript);
  const injectElem = createScript({
    id: Constants.Attribute.ExtensionID,
    src: chrome.extension.getURL(injectName),
    [Constants.Attribute.ExtensionUrlAttr]: injectURL
  });

  const workerName = Constants.Filename.CommentFilterWorkerScript;
  const workerURL = chrome.extension.getURL(workerName);
  const workerElem = createScript({
    src: workerURL,
    id: Constants.Attribute.WorkerID
  });

  fetch(workerURL)
    .then(res => res.blob())
    .then(blob => fileRead(blob))
    .then(url =>
      workerElem.setAttribute(Constants.Attribute.WorkerScriptAttr, url)
    );

  document.documentElement.appendChild(injectElem);
  document.documentElement.appendChild(workerElem);
}

function createScript(attrs: { [x: string]: string }) {
  const element = document.createElement("script");
  Object.keys(attrs).forEach(attr => {
    element.setAttribute(attr, attrs[attr]);
  });

  return element;
}

async function fileRead(blob: Blob) {
  return new Promise<string>(resolve => {
    const url = URL.createObjectURL(blob);
    resolve(url);
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   console.log(blob);
    //   const url = URL.createObjectURL(reader.result);
    //   resolve(url);
    // };
    // reader.readAsText(blob);
  });
}
