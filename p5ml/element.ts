import p5 from "p5";

export default class P5MLElement extends HTMLElement {
  static define() {
    customElements.define(`p5-${this.name.toLowerCase()}`, this);
  }

  static isP5(element: Element) {
    return element.tagName.toLowerCase().startsWith("p5-");
  }

  preDraw(_p: p5) {}
  draw(_p: p5) {}
  postDraw(_p: p5) {}

  drawRecursive(p: p5, target: Element = this) {
    Array.from(target.children).forEach((child: Element) => {
      if (P5MLElement.isP5(child)) {
        const p5child = child as P5MLElement;
        if (p5child.preDraw) {
          p5child.preDraw(p);
        }
        p5child.draw(p);
        if (p5child.postDraw) {
          p5child.postDraw(p);
        }
      } else {
        this.drawRecursive(p, child);
      }
    });
  }
}
