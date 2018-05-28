import NicoliveEmbeddedData from "./NicoliveEmbeddedData";
/**
 * 配信ページに埋め込まれているデータを取得して保持する
 */
class NicoLiveData {
  private cache?: NicoliveEmbeddedData;

  constructor(private targetElementId: string) {
    const element = document.getElementById(targetElementId);
    if (element) {
      const attrData = element.getAttribute("data-props");
      if (attrData) {
        this.cache = JSON.parse(attrData);
      }
    }
  }

  get embeddedData() {
    if (this.cache == null) {
      const element = document.getElementById(this.targetElementId);
      if (element) {
        const attrData = element.getAttribute("data-props");
        if (attrData) {
          this.cache = JSON.parse(attrData);
        }
      }
    }

    return this.cache;
  }
}

const nicoLiveData = new NicoLiveData("embedded-data");

export default nicoLiveData;
