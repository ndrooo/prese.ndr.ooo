import p5 from "p5";
import Draw2dElement from "./draw2d";

export default class Text extends Draw2dElement {
  content = this.innerText;

  static observedAttributes = ["src"];

  static {
    this.define();
  }

  connectedCallback() {
    this.style.display = "none";
  }

  async draw(p: p5) {
    p.text(this.content, 0, 0);
  }
}
