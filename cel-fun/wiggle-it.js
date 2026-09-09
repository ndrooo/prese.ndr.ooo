class SpinThing extends HTMLElement {
  canvas = this.closest("p5-canvas");
  wiggleFactor = 1;
  time = 0;

  static observedAttributes = ["wiggle-factor"];

  static {
    customElements.define("wiggle-it", this);
  }

  connectedCallback() {
    let children = [...this.children];
    let translate = document.createElement("p5-translate");
    this.appendChild(translate);
    children.forEach((child) => {
      translate.appendChild(child);
    });
    this.canvas.update.push((p) => {
      translate.setAttribute(
        "x",
        ((p.noise(this.time) - 0.5) * this.wiggleFactor).toFixed(1),
      );
      translate.setAttribute(
        "y",
        ((p.noise(this.time + 100) - 0.5) * this.wiggleFactor).toFixed(1),
      );
      this.time += 0.02;
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "wiggle-factor" && oldValue !== newValue) {
      this.wiggleFactor = Number(newValue);
    }
  }
}
