import P5MLElement from "../element";
import p5 from "p5";

export default class Draw2dElement extends P5MLElement {
  preDraw(p: p5) {
    p.stroke(getComputedStyle(this).getPropertyValue("color"));
    p.fill(getComputedStyle(this).getPropertyValue("background"));
  }

  postDraw(p: p5): void {
    p.noStroke();
    p.noFill();
  }
}
