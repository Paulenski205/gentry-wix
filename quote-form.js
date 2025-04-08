
class QuoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
        }
        .form-page {
          display: none;
        }
        .active {
          display: block;
        }
        .image-options img {
          width: 100px;
          cursor: pointer;
          border: 2px solid transparent;
        }
        .image-options input {
          display: none;
        }
        .image-options input:checked + img {
          border: 2px solid blue;
        }
        .image-options img:hover {
          border: 2px solid green;
        }
      </style>
      <form id="quoteForm">
        <div class="form-page active" id="page1">
          <h2>Customer Information</h2>
          <label for="nameInput">Name:</label>
          <input type="text" id="nameInput" required><br><br>
          <button type="button" onclick="nextPage()">Next</button>
        </div>
        <div class="form-page" id="page2">
          <h2>Select Material</h2>
          <label for="materialDropdown">Material:</label>
          <select id="materialDropdown" required>
            <option value="">-- Select --</option>
            <option value="wood">Wood</option>
            <option value="metal">Metal</option>
            <option value="glass">Glass</option>
          </select><br><br>
          <button type="button" onclick="prevPage()">Previous</button>
          <button type="button" onclick="nextPage()">Next</button>
        </div>
        <div class="form-page" id="page3">
          <h2>Select Style</h2>
          <div class="image-options">
            <label><input type="radio" name="style" value="modern" required><img src="https://via.placeholder.com/100x100?text=Modern" alt="Modern"></label>
            <label><input type="radio" name="style" value="traditional"><img src="https://via.placeholder.com/100x100?text=Traditional" alt="Traditional"></label>
            <label><input type="radio" name="style" value="rustic"><img src="https://via.placeholder.com/100x100?text=Rustic" alt="Rustic"></label>
          </div><br><br>
          <button type="button" onclick="prevPage()">Previous</button>
          <button type="button" onclick="nextPage()">Next</button>
        </div>
        <div class="form-page" id="page4">
          <h2>Enter Size</h2>
          <label for="sizeInput">Size (in inches):</label>
          <input type="number" id="sizeInput" required><br><br>
          <button type="button" onclick="prevPage()">Previous</button>
          <button type="submit">Submit Quote</button>
        </div>
      </form>
      <p id="successMessage" style="display: none; color: green;">Quote submitted successfully!</p>
      <p id="errorMessage" style="display: none; color: red;">There was an error submitting your quote. Please try again later.</p>
    `;

    let currentPage = 1;
    const form = this.querySelector("#quoteForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = this.querySelector("#nameInput").value;
      const material = this.querySelector("#materialDropdown").value;
      const dimensions = this.querySelector("#sizeInput").value;

      const styleRadios = this.querySelectorAll("input[name='style']");
      let style = "";
      for (let radio of styleRadios) {
        if (radio.checked) {
          style = radio.value;
          break;
        }
      }

      const quoteData = {
        customerName: name,
        material: material,
        style: style,
        dimensions: dimensions,
        comments: "N/A"
      };

      console.log("📤 Custom Element: Sending event to Wix", quoteData);
      this.dispatchEvent(new CustomEvent("submitQuote", {
        bubbles: true,
        composed: true,
        detail: quoteData
      }));

      form.reset();
      this.showPage(1);
    });

    this.showPage = (page) => {
      for (let i = 1; i <= 4; i++) {
        this.querySelector("#page" + i)?.classList.remove("active");
      }
      this.querySelector("#page" + page)?.classList.add("active");
      currentPage = page;
    };

    window.nextPage = () => {
      if (currentPage < 4) {
        this.querySelector("#page" + currentPage)?.classList.remove("active");
        currentPage++;
        this.querySelector("#page" + currentPage)?.classList.add("active");
      }
    };

    window.prevPage = () => {
      if (currentPage > 1) {
        this.querySelector("#page" + currentPage)?.classList.remove("active");
        currentPage--;
        this.querySelector("#page" + currentPage)?.classList.add("active");
      }
    };
  }
}

customElements.define('quote-form', QuoteForm);
