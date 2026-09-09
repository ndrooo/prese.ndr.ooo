export default class HyperslideSlide extends HTMLElement {
  sourceEl: HTMLPreElement = document.createElement("pre");

  static observedAttributes = ["source"];

  connectedCallback() {
    let children = Array.from(this.children);
    this.sourceEl.classList.add("source");
    this.sourceEl.style.display =
      this.getAttribute("source") === "true" ? "block" : "none";
    let codeEl = document.createElement("code");
    this.sourceEl.append(codeEl);
    codeEl.textContent = this.cleanSource(this.innerHTML);
    let contentEl = document.createElement("div");
    contentEl.classList.add("content");
    children.forEach((child) => contentEl.appendChild(child));
    this.append(contentEl);
    this.append(this.sourceEl);
  }

  cleanSource(orig: string): string {
    let asLines = orig.split("\n");
    asLines = asLines.filter((line) => line.length > 0);
    let trimNum = asLines[0].match("^ *")[0].length;
    asLines = asLines.map((line) => line.slice(trimNum));
    return asLines.join("\n");
  }

  show() {
    this.classList.add("active");
  }

  hide() {
    this.classList.remove("active");
  }

  toggleSource() {
    let source = this.getAttribute("source") === "true";
    this.setAttribute("source", (!source).toString());
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "source" && oldVal !== newVal) {
      this.sourceEl.style.display = newVal === "true" ? "block" : "none";
    }
  }
}
customElements.define("hs-slide", HyperslideSlide);
