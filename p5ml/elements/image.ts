import p5 from "p5";
import P5MLElement from "../element";

export default class Image extends P5MLElement {
  src: string = "";
  dirty = false;
  image: p5.Image | null = null;

  static observedAttributes = ["src"];

  static {
    this.define();
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (name === "src" && oldVal !== newVal) {
      this.src = newVal;
      this.dirty = true;
    }
  }

  async draw(p: p5) {
    if (this.src !== "") {
      if (this.dirty) {
        this.image = await p.loadImage(this.src);
        this.dirty = false;
      }
      p.image(this.image, 0, 0);
    }
  }
}
