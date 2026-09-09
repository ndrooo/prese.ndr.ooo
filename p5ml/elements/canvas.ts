import P5MLElement from "../element";
import p5 from "p5";

export default class Canvas extends P5MLElement {
  setup: ((p: p5) => void)[] = [];
  update: ((p: p5) => void)[] = [];
  paused: boolean = Boolean(this.getAttribute("paused"));
  ranFrameOne = false;
  static observedAttributes = ["paused"];
  p5instance: p5 | null = null;

  static {
    this.define();
  }

  connectedCallback() {
    if (this.p5instance === null) {
      this.p5instance = new p5(this.sketch.bind(this), this);
    }
  }

  sketch(p: p5) {
    p.setup = () => {
      p.createCanvas(
        Number(this.getAttribute("width")),
        Number(this.getAttribute("height")),
      );
      p.angleMode(this.getAngleMode(p));
      p.background(getComputedStyle(this).background);
      this.setup.forEach((setupFn) => {
        setupFn(p);
      });
    };
    p.draw = () => {
      if (this.paused && this.ranFrameOne) return;
      this.update.forEach((updateFn) => {
        updateFn(p);
      });
      p.background(getComputedStyle(this).background);
      this.drawRecursive(p);
      this.ranFrameOne = true;
    };
  }

  attributeChangedCallback(name: string, _oldValue, newValue) {
    if (name === "paused") {
      this.paused = Boolean(newValue);
    }
  }

  getAngleMode(p: p5): "degrees" | "radians" {
    const angleModeAttr = this.getAttribute("angle-mode");
    if (!angleModeAttr) {
      return p.RADIANS;
    }
    switch (angleModeAttr.toLowerCase()) {
      case "deg":
      case "degrees":
      case "d":
        return p.DEGREES;
      default:
        return p.RADIANS;
    }
  }
}
