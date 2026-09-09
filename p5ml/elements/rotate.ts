import type p5 from "p5";
import Transform2dElement from "./transform2d";

export default class Rotate extends Transform2dElement {
  angle: number = Number(this.getAttribute("angle") ?? 0);
  static observedAttributes = ["angle"];

  static {
    this.define();
  }

  draw(p: p5) {
    p.rotate(this.angle);
  }

  attributeChangedCallback(name: string, oldValue, newValue) {
    if (Number(oldValue) === Number(newValue)) return;
    this[name] = Number(newValue);
  }
}
