
class QuoteForm extends HTMLElement {
  connectedCallback() {
    // Load external CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/gh/Paulenski205/gentry-wix@main/wix-form-styles.css"; // Update to your commit URL if pinned
    document.head.appendChild(link);

    // Build the container
    this.innerHTML = \`
      <div class="quote-form-container">
        <div class="form-page welcome-page active" id="page1">
          <div class="image-banner">
            <h1>Your Dream Design</h1>
          </div>
          <div class="welcome-bottom">
            <button id="beginButton" class="begin-button">Begin</button>
          </div>
        </div>
      </div>
    \`;

    // Basic navigation logic for now
    const beginButton = this.querySelector("#beginButton");
    beginButton.addEventListener("click", () => {
      console.log("▶️ Begin clicked — switch to next page coming soon...");
      // Page switch will happen here in next steps
    });
  }
}

customElements.define("quote-form", QuoteForm);
