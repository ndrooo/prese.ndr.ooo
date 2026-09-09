class SpinThing extends HTMLElement {
  canvas = this.closest("p5-canvas");
  speed = 0;
  angle = 0;

  static observedAttributes = ["speed"];

  static {
    customElements.define("spin-thing", this);
  }

  connectedCallback() {
    let children = [...this.children];
    let rotate = document.createElement("p5-rotate");
    rotate.setAttribute("angle", this.angle.toFixed(0));
    this.appendChild(rotate);
    children.forEach((child) => {
      rotate.appendChild(child);
    });
    this.canvas.update.push((p) => {
      this.angle += this.speed;
      rotate.setAttribute("angle", this.angle);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "speed" && oldValue !== newValue) {
      this.speed = Number(newValue);
    }
  }
}
