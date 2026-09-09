import type p5 from "p5";
import Transform2dElement from "./transform2d";

export default class Scale extends Transform2dElement {
  x: number = Number(this.getAttribute("x") ?? 1);
  y: number = Number(this.getAttribute("y") ?? 1);
  static observedAttributes = ["x", "y"];

  static {
    this.define();
  }

  draw(p: p5) {
    p.scale(this.x, this.y);
  }

  attributeChangedCallback(name: string, oldValue, newValue) {
    if (Number(oldValue) === Number(newValue)) return;
    this[name] = Number(newValue);
  }
}
