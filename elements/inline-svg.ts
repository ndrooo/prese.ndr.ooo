export default class InlineSvg extends HTMLElement {
  src = this.getAttribute("src");

  async connectedCallback() {
    const response = await fetch(this.src);
    if (!response.ok) {
    }
    const svg = new DOMParser().parseFromString(
      await response.text(),
      "text/html",
    ).body.children[0];
    this.style.display = "contents";
    this.replaceChildren(svg);
  }
}
customElements.define("inline-svg", InlineSvg);
