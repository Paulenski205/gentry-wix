
class QuoteForm extends HTMLElement {
  connectedCallback() {
    if (!document.querySelector('link[href*="wix-form-styles.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://github.com/Paulenski205/gentry-wix/blob/50376cdf8da6c6637d9b35d108c9edca5538fdff/wix-form-styles.css";
      document.head.appendChild(link);
    }

    this.quoteData = {};

    this.innerHTML = `
      <div class="quote-form-container">
        <!-- Top: form content -->
        <div class="form-body">
          <!-- Page 1: Welcome -->
          <div class="form-page welcome-page active" id="page1">
            <div class="image-banner"><h1>Your Dream Design</h1></div>
          </div>

          <!-- Page 2: Contact Info -->
          <div class="form-page" id="page2">
<div class="required-note">*Required</div>

            <h2 style="color: white;">Tell us about yourself</h2>

            <div class="form-row">
              <div class="form-group"><label>First Name*</label><input type="text" id="firstname" required></div>
              <div class="form-group"><label>Last Name*</label><input type="text" id="lastname" required></div>
            </div>

            <div class="form-row">
              <div class="form-group"><label>Address Line 1</label><input type="text" id="address1"></div>
              <div class="form-group"><label>Address Line 2</label><input type="text" id="address2"></div>
            </div>

           <div class="form-row">
  <div class="form-group flex-2"><label>City*</label><input type="text" id="city" required></div>
  <div class="form-group"><label>State*</label>
    <select id="state" required>
  <option value="">Select State</option>
  <option value="AL">Alabama</option>
  <option value="AK">Alaska</option>
  <option value="AZ">Arizona</option>
  <option value="AR">Arkansas</option>
  <option value="CA">California</option>
  <option value="CO">Colorado</option>
  <option value="CT">Connecticut</option>
  <option value="DE">Delaware</option>
  <option value="FL">Florida</option>
  <option value="GA">Georgia</option>
  <option value="HI">Hawaii</option>
  <option value="ID">Idaho</option>
  <option value="IL">Illinois</option>
  <option value="IN">Indiana</option>
  <option value="IA">Iowa</option>
  <option value="KS">Kansas</option>
  <option value="KY">Kentucky</option>
  <option value="LA">Louisiana</option>
  <option value="ME">Maine</option>
  <option value="MD">Maryland</option>
  <option value="MA">Massachusetts</option>
  <option value="MI">Michigan</option>
  <option value="MN">Minnesota</option>
  <option value="MS">Mississippi</option>
  <option value="MO">Missouri</option>
  <option value="MT">Montana</option>
  <option value="NE">Nebraska</option>
  <option value="NV">Nevada</option>
  <option value="NH">New Hampshire</option>
  <option value="NJ">New Jersey</option>
  <option value="NM">New Mexico</option>
  <option value="NY">New York</option>
  <option value="NC">North Carolina</option>
  <option value="ND">North Dakota</option>
  <option value="OH">Ohio</option>
  <option value="OK">Oklahoma</option>
  <option value="OR">Oregon</option>
  <option value="PA">Pennsylvania</option>
  <option value="RI">Rhode Island</option>
  <option value="SC">South Carolina</option>
  <option value="SD">South Dakota</option>
  <option value="TN">Tennessee</option>
  <option value="TX">Texas</option>
  <option value="UT">Utah</option>
  <option value="VT">Vermont</option>
  <option value="VA">Virginia</option>
  <option value="WA">Washington</option>
  <option value="WV">West Virginia</option>
  <option value="WI">Wisconsin</option>
  <option value="WY">Wyoming</option>
</select>
  </div>
  <div class="form-group"><label>Zip*</label><input type="text" id="zip" required></div>
</div>

            <div class="form-row">
              <div class="form-group"><label>Email*</label><input type="email" id="email" required></div>
              <div class="form-group"><label>Phone Number*</label><input type="tel" id="phone" required></div>
            </div>
          </div>
        </div>

        <!-- Bottom: nav bar -->
        <div class="form-nav">
          <button id="resetFormBtn" class="reset-button">Reset Form</button>
          <div class="nav-buttons">
            <button id="prevBtn" class="nav-button">Previous</button>
            <button id="nextBtn" class="nav-button">Next</button>
            <button id="beginBtn" class="nav-button">Begin</button>
          </div>
        </div>
      </div>
    `;

    this.currentPage = 1;
    const totalPages = 2;

    this.showPage = (pageNum) => {
      const pages = this.querySelectorAll(".form-page");
      pages.forEach((pg, i) => {
        pg.classList.remove("active");
        if (i === pageNum - 1) pg.classList.add("active");
      });

      const beginBtn = this.querySelector("#beginBtn");
      const prevBtn = this.querySelector("#prevBtn");
      const nextBtn = this.querySelector("#nextBtn");

      beginBtn.style.display = pageNum === 1 ? "inline-block" : "none";
      prevBtn.style.display = pageNum > 1 ? "inline-block" : "none";
      nextBtn.style.display = pageNum > 1 ? "inline-block" : "none";

      this.currentPage = pageNum;
    };

    this.querySelector("#beginBtn").addEventListener("click", () => this.showPage(2));
    this.querySelector("#prevBtn").addEventListener("click", () => this.showPage(this.currentPage - 1));
    this.querySelector("#nextBtn").addEventListener("click", () => {
      if (this.currentPage < totalPages) {
        this.showPage(this.currentPage + 1);
      } else {
        alert("Page 3 coming soon...");
      }
    });

    this.querySelector("#resetFormBtn").addEventListener("click", () => {
      if (confirm("Are you sure you want to reset the quote form?")) {
        this.innerHTML = "";
        this.connectedCallback();
      }
    });

    this.showPage(1);
  }
}

customElements.define("quote-form", QuoteForm);
