import p5 from "p5";
import Draw2dElement from "./draw2d";

export default class Rect extends Draw2dElement {
  width: number = Number(this.getAttribute("w"));
  height: number = Number(this.getAttribute("h"));

  static {
    this.define();
  }

  draw(p: p5) {
    p.rect(0, 0, this.width, this.height);
  }
}
