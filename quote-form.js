class QuoteForm extends HTMLElement {
  connectedCallback() {
    // Load external CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/gh/Paulenski205/gentry-wix@28e67130725fe3a81f359c10cefca56e010d2356/wix-form-styles.css";
    document.head.appendChild(link);

    // Create quoteData object
    this.quoteData = {};

    // Inject HTML
this.innerHTML = `

      <div class="quote-form-container">
        <!-- Page 1: Welcome -->
        <div class="form-page welcome-page active" id="page1">
          <div class="image-banner">
            <h1>Your Dream Design</h1>
          </div>
          <div class="welcome-bottom">
            <button id="beginButton" class="begin-button">Begin</button>
          </div>
        </div>

        <!-- Page 2: Contact Info -->
        <div class="form-page" id="page2">
          <h2 style="color: white;">Tell us about yourself</h2>
          <div class="form-group"><label>Customer Name*</label><input type="text" id="customerName" required></div>
          <div class="form-group"><label>Address</label><input type="text" id="address"></div>
          <div class="form-group"><label>City*</label><input type="text" id="city" required></div>
          <div class="form-group"><label>State (Abbreviation)*</label>
            <select id="state" required>
              <option value="">Select State</option>
              <option value="AZ">AZ</option>
              <option value="CA">CA</option>
              <option value="TX">TX</option>
              <option value="NY">NY</option>
            </select>
          </div>
          <div class="form-group"><label>Zip*</label><input type="text" id="zip" required></div>
          <div class="form-group"><label>Email*</label><input type="email" id="email" required></div>
          <div class="form-group"><label>Phone*</label><input type="tel" id="phone" required></div>
          <div class="nav-buttons">
            <button id="prevPage2" class="nav-button">Previous</button>
            <button id="nextPage2" class="nav-button">Next</button>
          </div>
        </div>

        <!-- Page 3: Room Type Selector -->
        <div class="form-page" id="page3">
          <h2>Select a Room</h2>
          <div class="image-selector-grid">
            <div class="room-option" data-room="Kitchen">
              <img src="https://static.wixstatic.com/media/daaed2_7437c0b3f96f4bac8ebc7c5e725014c1~mv2.jpg" />
              <label>Kitchen</label>
            </div>
            <div class="room-option" data-room="Closet">
              <img src="https://via.placeholder.com/160?text=Closet" />
              <label>Closet</label>
            </div>
            <div class="room-option" data-room="Bathroom">
              <img src="https://via.placeholder.com/160?text=Bathroom" />
              <label>Bathroom</label>
            </div>
            <div class="room-option" data-room="Other Spaces">
              <img src="https://via.placeholder.com/160?text=Other+Spaces" />
              <label>Other Spaces</label>
            </div>
          </div>
          <div class="nav-buttons">
            <button id="prevPage3" class="nav-button">Previous</button>
            <button id="nextPage3" class="nav-button">Next</button>
          </div>
        </div>
      </div>
    `;

    // Page switching logic
    this.currentPage = 1;
    this.showPage = (pageNum) => {
      const pages = this.querySelectorAll(".form-page");
      pages.forEach((pg, i) => {
        pg.style.display = i === pageNum - 1 ? "block" : "none";
      });
      this.currentPage = pageNum;
    };

    // Event listeners
    this.querySelector("#beginButton").addEventListener("click", () => this.showPage(2));
    this.querySelector("#prevPage2").addEventListener("click", () => this.showPage(1));
    this.querySelector("#nextPage2").addEventListener("click", () => this.showPage(3));
    this.querySelector("#prevPage3").addEventListener("click", () => this.showPage(2));
    this.querySelector("#nextPage3").addEventListener("click", () => {
      if (this.quoteData.roomType) {
        console.log("✅ Room selected:", this.quoteData.roomType);
        this.showPage(4); // Placeholder — Page 4 coming next
      } else {
        alert("Please select a room type.");
      }
    });

    // Image selection logic
    const options = this.querySelectorAll(".room-option");
    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        options.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        this.quoteData.roomType = opt.dataset.room;
      });
    });

    this.showPage(1); // Initial page
  }
}

customElements.define("quote-form", QuoteForm);
