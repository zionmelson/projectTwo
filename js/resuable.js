import { store } from "./store.js";

class Movies extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["name", "year", "poster", "comment"];
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (property === "name") {
      this.moiveName.textContent = newValue;
    }

    if (property === "year") {
      this.movieYear.textContent = newValue;
    }

    if (property === "poster") {
      this.moviePoster.src = newValue;
    }
    if (property === "comment") {
      this.commentField.textContent = newValue;
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const template = document
      .getElementById("template")
      .content.cloneNode(true);

    shadow.append(template);

    this.moiveName = this.shadowRoot.querySelector("#movie-title");
    this.movieYear = this.shadowRoot.querySelector("#movie-year");
    this.moviePoster = this.shadowRoot.querySelector("#movie-poster");
    this.commentField = this.shadowRoot.querySelector("#comment-field");

    const name = this.getAttribute("name");
    if (name) {
      this.moiveName.textContent = name;
    }

    const year = this.getAttribute("year");
    if (year) {
      this.movieYear.textContent = year;
    }

    const poster = this.getAttribute("poster");
    if (name) {
      this.moviePoster.src = poster;
    }
    const comments = this.getAttribute("comment");
    if (comments) {
      this.commentField.textContent = comments;
    }

    this.textArea = this.shadowRoot.querySelector("#comments-area");
    this.postButton = this.shadowRoot.querySelector("#post");

    this.postButton.addEventListener("click", (ev) => {
      ev.preventDefault();
      const commentContent = this.textArea.value;
      store.postComment(commentContent);
      this.setAttribute("comment", commentContent);
    });
  }
}

customElements.define("reusable-movies", Movies);
