class MouseColor extends HTMLElement {
  slide = this.closest("hs-slide");

  connectedCallback() {
    this.slide.addEventListener("mousemove", this.mouseMove.bind(this));
  }

  mouseMove(event) {
    let hue = (360 * event.x) / window.innerWidth;
    let sat = (100 * event.y) / window.innerHeight;
    this.style.color = `hsl(${hue.toFixed(0)} ${sat.toFixed(0)}% 60%)`;
  }
}
customElements.define("mouse-color", MouseColor);
