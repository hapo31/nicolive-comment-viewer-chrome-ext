import NicoliveEmbeddedData from "./NicoliveEmbeddedData";

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
