import HyperslideSlide from "./hs-slide";

export default class HyperslidePresenter extends HTMLElement {
  activeSlide = Number(this.getAttribute("active-slide"));
  slides: HyperslideSlide[] = [];
  prevButton: HTMLButtonElement = document.createElement("button");
  nextButton: HTMLButtonElement = document.createElement("button");
  sourceButton: HTMLButtonElement = document.createElement("button");
  slideNumber: HTMLElement = document.createElement("span");

  connectedCallback() {
    this.classList.add("scripted");
    this.setAttribute("tabindex", Number(0).toString());
    this.slides = Array.from(this.children).filter(
      (element) => element.tagName.toLowerCase() === "hs-slide",
    ) as HyperslideSlide[];
    document.body.addEventListener("keydown", this.keyEvent.bind(this));
    const html = (strings: TemplateStringsArray, ...values) =>
      new DOMParser().parseFromString(
        String.raw({ raw: strings }, ...values),
        "text/html",
      ).body.children;
    let footer = html`<footer>
      <button class="restart" aria-label="Restart presentation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
      <button class="prev" aria-label="Previous slide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-step-back-icon lucide-step-back"
        >
          <path
            d="M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"
          />
          <path d="M21 20V4" />
        </svg>
      </button>
      <button class="next" aria-label="Next slide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-step-forward-icon lucide-step-forward"
        >
          <path
            d="M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
          />
          <path d="M3 4v16" />
        </svg>
      </button>
      <button class="source" aria-label="Toggle source">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-code-xml-icon lucide-code-xml"
        >
          <path d="m18 16 4-4-4-4" />
          <path d="m6 8-4 4 4 4" />
          <path d="m14.5 4-5 16" />
        </svg>
      </button>
      <span class="slide-number"></span>
    </footer>`[0];
    this.prevButton = footer.querySelector("button.prev") as HTMLButtonElement;
    this.nextButton = footer.querySelector("button.next") as HTMLButtonElement;
    this.slideNumber = footer.querySelector(
      ".slide-number",
    ) as HTMLButtonElement;
    let restartButton = footer.querySelector("button.restart");
    this.sourceButton = footer.querySelector("button.source");
    this.prevButton.addEventListener("click", this.retreat.bind(this));
    this.nextButton.addEventListener("click", this.advance.bind(this));
    restartButton.addEventListener("click", this.restart.bind(this));
    this.sourceButton.addEventListener("click", this.toggleSource.bind(this));
    this.append(footer);
    this.updateVisibility();
  }

  keyEvent(event: KeyboardEvent) {
    const { key } = event;
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    if (key === "ArrowRight" || key === "j" || key === "l") {
      this.advance();
      event.preventDefault();
    }
    if (key === "ArrowLeft" || key === "k" || key === "h") {
      this.retreat();
      event.preventDefault();
    }
    if (key === "r") {
      this.navigate(0);
    }
    if (key === "v" || key === "s") {
      this.toggleSource();
    }
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (
      name === "active-slide" &&
      newVal !== oldVal &&
      Number(newVal) !== null
    ) {
      this.navigate(Number(newVal));
    }
  }

  restart() {
    this.navigate(0);
  }

  advance() {
    this.navigate(this.activeSlide + 1);
  }

  retreat() {
    this.navigate(this.activeSlide - 1);
  }

  toggleSource() {
    this.slides[this.activeSlide].toggleSource();
    this.updateSourceButton();
  }

  navigate(slideIndex: number) {
    if (
      slideIndex < 0 ||
      slideIndex >= this.slides.length ||
      slideIndex === this.activeSlide
    ) {
      return;
    }
    this.activeSlide = slideIndex;
    this.updateVisibility();
  }

  updateVisibility() {
    let slide = this.slides[this.activeSlide];
    this.slides.forEach((slide) => slide.hide());
    slide.show();
    this.prevButton.disabled = this.activeSlide <= 0;
    this.nextButton.disabled = this.activeSlide >= this.slides.length - 1;
    this.slideNumber.innerText = `Slide ${this.activeSlide + 1} of ${this.slides.length}`;
    this.updateSourceButton();
  }

  updateSourceButton() {
    this.sourceButton.setAttribute(
      "aria-pressed",
      this.slides[this.activeSlide].getAttribute("source"),
    );
  }
}
customElements.define("hs-presentation", HyperslidePresenter);
