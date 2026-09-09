import Draw2dElement from "./draw2d";
import p5 from "p5";

export default class Circle extends Draw2dElement {
  diameter: number = Number(this.getAttribute("d"));

  static {
    this.define();
  }

  draw(p: p5) {
    p.circle(0, 0, this.diameter);
  }
}
