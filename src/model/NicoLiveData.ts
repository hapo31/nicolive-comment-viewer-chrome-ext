import NicoliveEmbeddedData from "./NicoliveEmbeddedData";
/**
 * 配信ページに埋め込まれているデータを取得して保持する
 */
class NicoLiveData {
  public nicoliveEmbeddedData?: NicoliveEmbeddedData;

  constructor(targetElementId: string) {
    const element = document.getElementById(targetElementId);
    if (element) {
      const attrData = element.getAttribute("data-props");
      if (attrData) {
        this.nicoliveEmbeddedData = JSON.parse(attrData);
      }
    }
  }
}

const nicoLiveData = new NicoLiveData("embedded-data").nicoliveEmbeddedData!;

export default nicoLiveData;
