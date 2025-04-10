
class QuoteForm extends HTMLElement {
  connectedCallback() {
    if (!document.querySelector('link[href*="wix-form-styles.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/gh/Paulenski205/gentry-wix@3194a2eb412abd174d6ce134b57308a043ff89fc/wix-form-styles.css";
      document.head.appendChild(link);
    }

    this.quoteData = {};

    this.innerHTML = `
      <div class="quote-form-container">

        <!-- Reset Button -->
        <button id="resetFormBtn" class="reset-button">Reset Form</button>

        <!-- Page 1: Welcome -->
        <div class="form-page welcome-page active" id="page1">
          <div class="image-banner"><h1>Your Dream Design</h1></div>
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
          <div class="form-group"><label>State*</label>
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

        <!-- Page 3: Room Type -->
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

        <!-- Page 4: Kitchen Style -->
        <div class="form-page" id="page4">
          <h2>Kitchen Design: Step 1</h2>
          <div class="kitchen-step active" id="kitchenStep1">
            <h3>Select your preferred kitchen style(s):</h3>
            <div class="kitchen-gallery" id="kitchenStyles">
              <div class="kitchen-option" data-style="Modern">
                <img src="https://via.placeholder.com/160?text=Modern" />
                <label>Modern</label>
              </div>
              <div class="kitchen-option" data-style="Traditional">
                <img src="https://via.placeholder.com/160?text=Traditional" />
                <label>Traditional</label>
              </div>
              <div class="kitchen-option" data-style="Rustic">
                <img src="https://via.placeholder.com/160?text=Rustic" />
                <label>Rustic</label>
              </div>
              <div class="kitchen-option" data-style="Farmhouse">
                <img src="https://via.placeholder.com/160?text=Farmhouse" />
                <label>Farmhouse</label>
              </div>
              <div class="kitchen-option" data-style="Transitional">
                <img src="https://via.placeholder.com/160?text=Transitional" />
                <label>Transitional</label>
              </div>
              <div class="kitchen-option" data-style="Minimalist">
                <img src="https://via.placeholder.com/160?text=Minimalist" />
                <label>Minimalist</label>
              </div>
            </div>
          </div>
          <div class="nav-buttons">
            <button id="prevPage4" class="nav-button">Previous</button>
            <button id="nextPage4" class="nav-button">Next</button>
          </div>
        </div>

      </div>
    `;

    this.currentPage = 1;
    this.showPage = (pageNum) => {
      const pages = this.querySelectorAll(".form-page");
      pages.forEach((pg, i) => {
        pg.classList.remove("active");
        if (i === pageNum - 1) pg.classList.add("active");
      });
      this.currentPage = pageNum;
    };

    // Navigation
    this.querySelector("#beginButton").addEventListener("click", () => {
      this.querySelector("#page1").remove(); // remove welcome
      this.showPage(2);
      this.querySelector("#prevPage2").style.display = "none";
    });

    this.querySelector("#nextPage2").addEventListener("click", () => this.showPage(3));
    this.querySelector("#prevPage3").addEventListener("click", () => this.showPage(2));
    this.querySelector("#nextPage3").addEventListener("click", () => {
      if (this.quoteData.roomType === "Kitchen") {
        this.quoteData.kitchen = { style: [] };
        this.showPage(4);
      } else {
        alert("Only Kitchen flow is available at this time.");
      }
    });

    this.querySelector("#prevPage4").addEventListener("click", () => this.showPage(3));
    this.querySelector("#nextPage4").addEventListener("click", () => {
      console.log("✅ Kitchen styles selected:", this.quoteData.kitchen.style);
      alert("Next kitchen step coming soon...");
    });

    this.querySelector("#resetFormBtn").addEventListener("click", () => {
      location.reload();
    });

    // Room selection
    const roomOptions = this.querySelectorAll(".room-option");
    roomOptions.forEach(opt => {
      opt.addEventListener("click", () => {
        roomOptions.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        this.quoteData.roomType = opt.dataset.room;
      });
    });

    // Multi-style select
    const styleOptions = this.querySelectorAll("#kitchenStyles .kitchen-option");
    styleOptions.forEach(option => {
      option.addEventListener("click", () => {
        const style = option.dataset.style;
        const isSelected = option.classList.contains("selected");
        option.classList.toggle("selected");
        if (!isSelected) {
          this.quoteData.kitchen.style.push(style);
        } else {
          this.quoteData.kitchen.style = this.quoteData.kitchen.style.filter(s => s !== style);
        }
        console.log("🛠️ Selected styles:", this.quoteData.kitchen.style);
      });
    });

    this.showPage(1);
  }
}

customElements.define("quote-form", QuoteForm);
