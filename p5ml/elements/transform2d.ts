import P5MLElement from "../element";
import p5 from "p5";

export default class Transform2dElement extends P5MLElement {
  preDraw(p: p5): void {
    p.push();
  }

  postDraw(p: p5): void {
    this.drawRecursive(p);
    p.pop();
  }
}
