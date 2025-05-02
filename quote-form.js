class QuoteForm extends HTMLElement {
  constructor() {
    super();
    this.currentPage = 1;
    this.quoteData = {};
    this.totalPages = 7;
  }

// Phone number formatter
formatPhoneNumber(value) {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '');
  
  // Limit to 10 digits
  const limited = cleaned.slice(0, 10);
  
  // Format the number based on length
  if (limited.length === 0) {
    return '';
  }
  
  // Format parts
  const areaCode = limited.slice(0, 3);
  const middle = limited.slice(3, 6);
  const last = limited.slice(6);
  
  if (limited.length <= 3) {
    return '(' + limited;
  }
  if (limited.length <= 6) {
    return '(' + areaCode + ') ' + middle;
  }
  return '(' + areaCode + ') ' + middle + '-' + last;
}


// Zip code validator
validateZipCode(value) {
  return /^\d{5}$/.test(value);  // This checks for exactly 5 digits
}


// Improved showPage method
showPage = (pageNum) => {
    const pages = this.querySelectorAll(".form-page");
    pages.forEach((pg, i) => {
        pg.classList.toggle("active", i === pageNum - 1);
    });
    this.currentPage = pageNum;
    
    const beginButton = this.querySelector("#beginBtn");
    const prevButton = this.querySelector("#prevBtn");
    const nextButton = this.querySelector("#nextBtn");
    const startOverButton = this.querySelector("#startOverBtn");
    
    if (pageNum === 1) {
        beginButton.style.display = "block";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
    } else if (pageNum === 7) { // Thank you page
        beginButton.style.display = "none";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        startOverButton.style.display = "block";
    } else {
        beginButton.style.display = "none";
        prevButton.style.display = "block";
        nextButton.style.display = "block";
        
        if (pageNum === 6) {
            nextButton.textContent = "Submit";
            nextButton.style.backgroundColor = "var(--success-color)";
        } else {
            nextButton.textContent = "Next";
            nextButton.style.backgroundColor = "var(--primary-color)";
        }
    }

    this.saveFormData();
};

validatePhoneNumber(phone) {
  // First, remove all formatting
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if we have exactly 10 digits
  return cleaned.length === 10;
}

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  connectedCallback() {
    if (!document.querySelector('link[href*="wix-form-styles.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/gh/Paulenski205/gentry-wix@44fb9a159167026ed5da6d80e3e0d1bd930f151d/wix-form-styles.css";
      document.head.appendChild(link);
    }

    this.quoteData = {};

    this.innerHTML = `
      <div class="quote-form-container">
        <div class="form-body">
          <div class="form-page welcome-page active" id="page1">
            <div class="image-banner"><h1>Your Dream Design</h1></div>
          </div>

          <div class="form-page" id="page2">
            <div class="required-note">*Required</div>
            <h2>Tell us about yourself</h2>
            <div class="form-content">
              <div class="form-row">
                <div class="form-group"><label for="FirstName">First Name</label><input type="text" id="FirstName" required placeholder="Required field"></div>
                <div class="form-group"><label for="LastName">Last Name</label><input type="text" id="LastName" required placeholder="Required field"></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label for="AddressLine1">Address Line 1</label><input type="text" id="AddressLine1"></div>
                <div class="form-group"><label for="AddressLine2">Address Line 2</label><input type="text" id="AddressLine2"></div>
              </div>
              <div class="form-row">
                <div class="form-group flex-2"><label for="City">City</label><input type="text" id="City" required placeholder="Required field"></div>
                <div class="form-group"><label for="State">State</label>
                  <select id="State" required>
  <option value="" style="color: #999; font-style: italic;">Select State</option>
  ${[
    "AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA",
"MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK",
"OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
  ].map(code => `<option value="${code}">${code}</option>`).join("")}
</select>
                </div>
                <div class="form-group">
  <label for="Zip">Zip</label>
  <input type="text" id="Zip" required placeholder="Required field" maxlength="5" inputmode="numeric" pattern="\d{5}">
</div>
              </div>
              <div class="form-row">
                <div class="form-group"><label for="Email">Email</label><input type="email" id="Email" required placeholder="Required field"></div>
                <div class="form-group">
  <label for="Phone">Phone Number*</label>
  <input type="tel" id="Phone" required placeholder="Required field" inputmode="numeric">
</div>
              </div>
            </div>
          </div>

          <div class="form-page" id="page3">
            <h2 style="color: white;">Choose Space</h2>
            <div class="room-grid">
              <div class="room-option" data-room="Kitchens">
                <img src="https://static.wixstatic.com/media/daaed2_dc05ac576e954186a9ca8cbe62dcc4fc~mv2.jpg" />
                <label>Kitchens</label>
              </div>
              <div class="room-option" data-room="Bathrooms">
                <img src="https://static.wixstatic.com/media/daaed2_7a414666570945fa986f26530dd12a1a~mv2.jpg" />
                <label>Bathrooms</label>
              </div>
              <div class="room-option" data-room="Closets">
                <img src="https://static.wixstatic.com/media/daaed2_58bc2717dd864729bd78624a059b2aeb~mv2.jpg" />
                <label>Closets</label>
              </div>
              <div class="room-option" data-room="Other Spaces">
                <img src="https://static.wixstatic.com/media/daaed2_3d8cac2b04ca4667a4689bb57c9e7525~mv2.jpg" />
                <label>Other Spaces</label>
                <input type="text" class="other-input" placeholder="Enter room name..." style="display: none;" />
              </div>
            </div>
          </div>
        </div>

        <div class="form-nav">
  <button id="resetFormBtn" class="reset-button">Reset Form</button>
  <div class="nav-buttons">
    <button id="beginBtn" class="nav-button">Begin</button>
    <button id="prevBtn" class="nav-button">Previous</button>
    <button id="nextBtn" class="nav-button">Next</button>
  </div>
</div>
  <div class="form-page" id="page7">
    <div class="thank-you-content">
      <h2>Thank You!</h2>
      <p>Your submission has been received. We will contact you shortly.</p>
      <div class="form-nav thank-you-nav">
        <button id="startOverBtn" class="nav-button">Start Over</button>
      </div>
    </div>
  </div>
    `;

  // Add page unload listener
  window.addEventListener('beforeunload', () => {
    this.clearSavedData();
  });

// Initial button setup
    const beginButton = this.querySelector("#beginBtn");
    const prevButton = this.querySelector("#prevBtn");
    const nextButton = this.querySelector("#nextBtn");

    // Set initial visibility
    beginButton.style.display = "block";
    prevButton.style.display = "none";
    nextButton.style.display = "none";

    this.initializeEventListeners();
// Load saved data after form is initialized
  this.loadFormData();

// Add success/error event listeners
    this.addEventListener('submitSuccess', () => {
        this.showPage(7); // Show thank you page
    });

    this.addEventListener('submitError', () => {
        this.showPage(1); // Go back to first page
    });

  }

renderStyleSelectionPage() {
  let page4 = this.querySelector('#page4');
  if (!page4) {
    page4 = document.createElement('div');
    page4.id = 'page4';
    page4.className = 'form-page';
    this.querySelector('.form-body').appendChild(page4);
  }

// Define styleOptions as a class property
    this.styleOptions = {
      Kitchens: [
    { name: 'Modern', image: 'https://static.wixstatic.com/media/daaed2_b8744cc53bf3439d98919bb5cd2c7a97~mv2.jpg/v1/crop/x_361,y_0,w_1709,h_1663/fill/w_399,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Modern%20Kitchen%205_edited.jpg' },
    { name: 'Traditional', image: 'https://static.wixstatic.com/media/daaed2_ed56a74ed08243e5a0005f9ff9953baa~mv2.jpg/v1/fill/w_399,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Traditional%20Kitchen%206.jpg' },
    { name: 'Rustic', image: 'https://static.wixstatic.com/media/daaed2_46b96a9910a44b4f8eed71a300d35b4e~mv2.jpg/v1/fill/w_399,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rustic%20Kitchen%202.jpg' },
    { name: 'Transitional', image: 'https://static.wixstatic.com/media/daaed2_677d2a30dae34169ba4b44c46f5d6802~mv2.jpg/v1/fill/w_399,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Transitional%20Kitchen%201.jpg' },
    { name: 'Industrial', image: 'https://static.wixstatic.com/media/daaed2_97ce2bf00677403885f93fd34b22c1c5~mv2.jpg/v1/crop/x_134,y_0,w_1645,h_1600/fill/w_399,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Industrial%20Kitchen%204_edited.jpg' },
    { name: 'Scandinavian', image: 'https://static.wixstatic.com/media/daaed2_e71dc90fdc5245cc93fd0979c93d168c~mv2.jpg/v1/fill/w_399,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Scandinavian%20Kitchen%202.jpg' },
    { name: 'Farmhouse', image: 'https://static.wixstatic.com/media/daaed2_e426bf3ec898443398bcfea2b46e2615~mv2.jpg/v1/fill/w_399,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Farmhouse%20Kitchen%203.jpg' },
    { name: 'Custom', image: 'https://static.wixstatic.com/media/daaed2_e2d0afe9dc2e4428ac0736d0465cea7a~mv2.jpg/v1/fill/w_399,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/custom%20design.jpg' }
  ],
  Closets: [
    { name: 'Sleek and Functional', image: 'https://static.wixstatic.com/media/daaed2_75ba10e1417241abb00a7b2e1c45b9b3~mv2.png/v1/crop/x_185,y_0,w_1710,h_1664/fill/w_241,h_234,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Closet%204%20-%20Inspirations.png' },
    { name: 'Fresh Chic', image: 'https://static.wixstatic.com/media/daaed2_cd97690c689d44b786b469e25689e8f0~mv2.png/v1/fill/w_241,h_234,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Closet%203%20-%20Inspirations.png' },
    { name: 'Modern Luxury', image: 'https://static.wixstatic.com/media/daaed2_389111ba18b6411c9b3d3526ac6518f3~mv2.png/v1/fill/w_241,h_234,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Closet%202%20-%20Inspirations.png' },
    { name: 'Custom', image: 'https://static.wixstatic.com/media/daaed2_e2d0afe9dc2e4428ac0736d0465cea7a~mv2.jpg/v1/fill/w_399,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/custom%20design.jpg' }
  ],
  Bathrooms: [
    { name: 'Country Serenity', image: 'https://static.wixstatic.com/media/daaed2_e2b8980aa2834f259f6e0b77bf5bbe97~mv2.png/v1/crop/x_185,y_0,w_1710,h_1664/fill/w_241,h_234,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Bathroom%202%20-%20Inspirations.png' },
    { name: 'Opulent Luxury', image: 'https://static.wixstatic.com/media/daaed2_fada6352b27845cf806789e1c491008a~mv2.png/v1/fill/w_241,h_234,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Bathroom%203%20-%20Inspirations.png' },
    { name: 'Timeless Grandeur', image: 'https://static.wixstatic.com/media/daaed2_c37579e0723b43358293c1cc2838acdd~mv2.png/v1/fill/w_241,h_234,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Bathroom%201%20-%20Inspirations.png' },
    { name: 'Custom', image: 'https://static.wixstatic.com/media/daaed2_e2d0afe9dc2e4428ac0736d0465cea7a~mv2.jpg/v1/fill/w_399,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/custom%20design.jpg' }
  ],
  'Other Spaces': [
    { name: 'Minimalist', image: 'https://static.wixstatic.com/media/daaed2_004c8db7043b415ab396db727ae336ba~mv2.jpg/v1/fill/w_180,h_161,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Office.jpg' },
    { name: 'Functional', image: 'https://static.wixstatic.com/media/daaed2_004c8db7043b415ab396db727ae336ba~mv2.jpg/v1/fill/w_180,h_161,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Office.jpg' },
    { name: 'Custom', image: 'https://static.wixstatic.com/media/daaed2_004c8db7043b415ab396db727ae336ba~mv2.jpg/v1/fill/w_180,h_161,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Office.jpg' }
  ]
  };

  // Get styles for selected room using this.styleOptions
  const selectedRoom = this.quoteData.Room;
  const styles = this.styleOptions[selectedRoom] || [];

  // Create the HTML content
  page4.innerHTML = `
    <div class="required-note">*Required</div>
    <h2>Select Your Style</h2>
  <div class="style-grid">
    ${styles.map(style => `
      <div class="style-option ${this.quoteData.StyleSelection === style.name ? 'selected' : ''}" data-style="${style.name}">
        <img src="${style.image}" alt="${style.name} style">
        <label>${style.name}</label>
      </div>
    `).join('')}
  </div>
    <div class="style-selection-required">Please select a style to continue</div>
  `;

  const styleGrid = page4.querySelector('.style-grid');
  const styleElements = page4.querySelectorAll('.style-option');
  const requiredMessage = page4.querySelector('.style-selection-required');

  // Add click handlers
  styleElements.forEach(element => {
    element.addEventListener('click', () => {
      styleElements.forEach(el => el.classList.remove('selected'));
      element.classList.add('selected');
      this.quoteData.StyleSelection = element.dataset.style;
      styleGrid.classList.remove('field-error');
      requiredMessage.classList.remove('show');
      this.saveFormData();
      console.log('Style selected:', this.quoteData.StyleSelection); // Debug line
    });
  });
  // Move this inside the method where page4 is defined
  if (this.quoteData.StyleSelection) {
    const savedStyle = page4.querySelector(`[data-style="${this.quoteData.StyleSelection}"]`);
    if (savedStyle) {
      savedStyle.classList.add('selected');
      styleGrid.classList.remove('field-error');
      requiredMessage.classList.remove('show');
    }
  }
}


// Update the validation method
validateStyleSelection() {
  const styleGrid = this.querySelector('.style-grid');
  const requiredMessage = this.querySelector('.style-selection-required');
  
  // Check both the stored data and visual selection
  const hasSelection = this.quoteData.StyleSelection && 
                      this.querySelector('.style-option.selected');
  
  if (!hasSelection) {
    styleGrid.classList.add('field-error');
    requiredMessage.classList.add('show');
    return false;
  }
  
  styleGrid.classList.remove('field-error');
  requiredMessage.classList.remove('show');
  return true;
}

renderDimensionsPage() {
  let page5 = this.querySelector('#page5');
  if (!page5) {
    page5 = document.createElement('div');
    page5.id = 'page5';
    page5.className = 'form-page';
    this.querySelector('.form-body').appendChild(page5); // Append to form-body
  }

// Different dimension fields based on room type
let dimensionFields = '';
switch(this.quoteData.Room) {
  case 'Kitchens':
    dimensionFields = `
      <div class="form-row dimensions-row">
        <div class="form-group">
          <label for="length">Kitchen Length (inches)*</label>
          <input type="number" id="length" required min="1" step="0.1" placeholder="Required field">
        </div>
        <div class="form-group">
          <label for="width">Kitchen Width (inches)*</label>
          <input type="number" id="width" required min="1" step="0.1" placeholder="Required field">
        </div>
        <div class="form-group">
          <label for="ceiling">Kitchen Height (inches)*</label>
          <input type="number" id="ceiling" required min="1" step="0.1" placeholder="Required field">
        </div>
      </div>
    `;
    break;
  case 'Bathrooms':
    dimensionFields = `
      <div class="form-row dimensions-row">
        <div class="form-group">
          <label for="length">Bathroom Length (inches)*</label>
          <input type="number" id="length" required min="1" step="0.1" placeholder="Required field">
        </div>
        <div class="form-group">
          <label for="width">Bathroom Width (inches)*</label>
          <input type="number" id="width" required min="1" step="0.1" placeholder="Required field">
        </div>
        <div class="form-group">
          <label for="ceiling">Bathroom Height (inches)*</label>
          <input type="number" id="ceiling" required min="1" step="0.1" placeholder="Required field">
        </div>
      </div>
    `;
    break;
  case 'Closets':
    dimensionFields = `
      <div class="form-row dimensions-row">
        <div class="form-group">
          <label for="length">Closet Length (inches)*</label>
          <input type="number" id="length" required min="1" step="0.1" placeholder="Required field">
        </div>
        <div class="form-group">
          <label for="width">Closet Width (inches)*</label>
          <input type="number" id="width" required min="1" step="0.1" placeholder="Required field">
        </div>
        <div class="form-group">
          <label for="ceiling">Closet Height (inches)*</label>
          <input type="number" id="ceiling" required min="1" step="0.1" placeholder="Required field">
        </div>
      </div>
    `;
    break;
  default:
    // For "Other Spaces", use the custom room name if available
    const roomName = this.quoteData.customRoomName || 'Room';
    dimensionFields = `
      <div class="form-row dimensions-row">
        <div class="form-group">
          <label for="length">${roomName} Length (inches)*</label>
          <input type="number" id="length" required min="1" step="0.1" placeholder="Required field">
        </div>
        <div class="form-group">
          <label for="width">${roomName} Width (inches)*</label>
          <input type="number" id="width" required min="1" step="0.1" placeholder="Required field">
        </div>
        <div class="form-group">
          <label for="ceiling">${roomName} Height (inches)*</label>
          <input type="number" id="ceiling" required min="1" step="0.1" placeholder="Required field">
        </div>
      </div>
    `;
}
if (page5) {
  page5.innerHTML = `
    <div class="required-note">*Required</div>
    <h2>Room Dimensions</h2>
    <div class="form-content">
      ${dimensionFields}
      <div class="form-row">
        <div class="form-group full-width">
          <label for="additional-notes">Additional Notes (optional)</label>
          <textarea id="additional-notes" rows="4"></textarea>
        </div>
      </div>
    </div>
  `;
} else {
    console.error("Error: page5 element not found.");
  }

  // Add event listeners for dimension inputs
  const dimensionInputs = page5.querySelectorAll('input[type="number"]');
  dimensionInputs.forEach(input => {
    // Set initial value if it exists in quoteData
    if (this.quoteData.dimensions && this.quoteData.dimensions[input.id]) {
      input.value = this.quoteData.dimensions[input.id];
    }

    input.addEventListener('input', () => {
      if (!this.quoteData.dimensions) {
        this.quoteData.dimensions = {};
      }
      this.quoteData.dimensions[input.id] = parseFloat(input.value);
      this.saveFormData(); // Save after each change
    });
  });

  // Add event listener for additional notes
  const notesInput = page5.querySelector('#additional-notes');
  if (this.quoteData.additionalNotes) {
    notesInput.value = this.quoteData.additionalNotes;
  }
  
  notesInput.addEventListener('input', () => {
    this.quoteData.additionalNotes = notesInput.value;
    this.saveFormData(); // Save after each change
  });
}

// Update validateRequiredFields method
validateRequiredFields(pageId) {
  const inputs = this.querySelectorAll(`#${pageId} [required]`);
  let isValid = true;
  
  inputs.forEach(input => {
    // Clear previous error states
    input.classList.remove('field-error');
    
    if (input.id === 'Zip') {
      // Special validation for zip code
      if (!input.value.trim() || input.value.length !== 5) {
        input.classList.add('field-error');
        isValid = false;
      }
    } else if (!input.value.trim()) {
      input.classList.add('field-error');
      isValid = false;
    }
  });

  if (!isValid) {
    alert("Please fill out all required fields marked with *");
  }

  return isValid;
}

renderReviewPage() {
  let page6 = this.querySelector('#page6');
  if (!page6) {
    page6 = document.createElement('div');
    page6.id = 'page6';
    page6.className = 'form-page';
    this.querySelector('.form-body').appendChild(page6);
  }

  // Format dimensions for display
  const dimensions = this.quoteData.dimensions || {};
const dimensionsHtml = Object.entries(dimensions)
  .map(([key, value]) => `
    <div class="review-item">
      <span class="review-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
      <span class="review-value">${value} inches</span>
    </div>
  `).join('');

// Update the review page HTML structure
// Update the renderReviewPage HTML structure
page6.innerHTML = `
  <h2>Review Your Information</h2>
  <div class="form-content review-content">
    <div class="review-sections-grid">
      <div class="review-section">
        <h3>Personal Information</h3>
        <div class="review-grid personal-info-grid">
          <div class="review-item">
            <span class="review-label">Name</span>
            <span class="review-value">${this.querySelector('#FirstName')?.value || ''} ${this.querySelector('#LastName')?.value || ''}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Email</span>
            <span class="review-value">${this.querySelector('#Email')?.value || ''}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Phone</span>
            <span class="review-value">${this.querySelector('#Phone')?.value || ''}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Address</span>
            <span class="review-value">
              ${this.querySelector('#AddressLine1')?.value || ''}<br>
              ${this.querySelector('#AddressLine2')?.value ? this.querySelector('#AddressLine2').value + '<br>' : ''}
              ${this.querySelector('#City')?.value || ''}, ${this.querySelector('#State')?.value || ''} ${this.querySelector('#Zip')?.value || ''}
            </span>
          </div>
        </div>
      </div>

      <div class="review-section">
        <h3>Project Details</h3>
        <div class="review-grid project-details-grid">
          <div class="review-item">
            <span class="review-label">Room Type</span>
            <span class="review-value">${this.quoteData.Room || ''}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Style Selection</span>
            <span class="review-value">${this.quoteData.StyleSelection || ''}</span>
          </div>
        </div>
      </div>

      <div class="review-section">
        <h3>Room Dimensions</h3>
        <div class="review-grid dimensions-grid">
          ${dimensionsHtml}
        </div>
      </div>

      ${this.quoteData.additionalNotes ? `
        <div class="review-section">
          <h3>Additional Notes</h3>
          <div class="review-item">
            <span class="review-value">${this.quoteData.additionalNotes}</span>
          </div>
        </div>
      ` : ''}
    </div>
  </div>
`;
}

// Save form data to localStorage
saveFormData() {
  const formData = {
    personalInfo: {
      firstName: this.querySelector('#FirstName')?.value,
      lastName: this.querySelector('#LastName')?.value,
      addressLine1: this.querySelector('#AddressLine1')?.value,
      addressLine2: this.querySelector('#AddressLine2')?.value,
      city: this.querySelector('#City')?.value,
      state: this.querySelector('#State')?.value,
      zip: this.querySelector('#Zip')?.value,
      email: this.querySelector('#Email')?.value,
      phone: this.querySelector('#Phone')?.value
    },
    quoteData: this.quoteData
  };
  
  localStorage.setItem('formData', JSON.stringify(formData));
}

// Load form data from localStorage
loadFormData() {
  const savedData = localStorage.getItem('formData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    
    // Restore personal information
    if (formData.personalInfo) {
      this.querySelector('#FirstName').value = formData.personalInfo.firstName || '';
      this.querySelector('#LastName').value = formData.personalInfo.lastName || '';
      this.querySelector('#AddressLine1').value = formData.personalInfo.addressLine1 || '';
      this.querySelector('#AddressLine2').value = formData.personalInfo.addressLine2 || '';
      this.querySelector('#City').value = formData.personalInfo.city || '';
      this.querySelector('#State').value = formData.personalInfo.state || '';
      this.querySelector('#Zip').value = formData.personalInfo.zip || '';
      this.querySelector('#Email').value = formData.personalInfo.email || '';
      this.querySelector('#Phone').value = formData.personalInfo.phone || '';
    }
    
    // Restore quote data
    if (formData.quoteData) {
      this.quoteData = formData.quoteData;
      
      // Restore room selection
      if (this.quoteData.Room) {
        const roomOption = this.querySelector(`.room-option[data-room="${this.quoteData.Room}"]`);
        if (roomOption) {
          roomOption.classList.add('selected');
        }
      }
      
}
      


// Restore dimensions
      if (this.quoteData.dimensions) {
        const dimensionsPage = this.querySelector('#page5');
        if (dimensionsPage) {
          const dimensionInputs = dimensionsPage.querySelectorAll('input[type="number"]');
          dimensionInputs.forEach(input => {
            if (this.quoteData.dimensions[input.id]) {
              input.value = this.quoteData.dimensions[input.id];
            }
          });
        }

        // Restore additional notes
        if (this.quoteData.additionalNotes) {
          const notesInput = dimensionsPage?.querySelector('#additional-notes');
          if (notesInput) {
            notesInput.value = this.quoteData.additionalNotes;
          }
        }
      }
    }
  
}

// Clear saved form data
clearSavedData() {
  localStorage.removeItem('formData');
}

async submitQuote() {
    try {
        const formData = {
            personalInfo: {
                firstName: this.querySelector('#FirstName').value,
                lastName: this.querySelector('#LastName').value,
                email: this.querySelector('#Email').value,
                phone: this.querySelector('#Phone').value,
                address: {
                    line1: this.querySelector('#AddressLine1').value,
                    line2: this.querySelector('#AddressLine2').value,
                    city: this.querySelector('#City').value,
                    state: this.querySelector('#State').value,
                    zip: this.querySelector('#Zip').value
                }
            },
            projectDetails: {
                roomType: this.quoteData.Room,
                style: this.quoteData.StyleSelection,
                dimensions: this.quoteData.dimensions,
                additionalNotes: this.quoteData.additionalNotes
            }
        };

        console.log('Dispatching event with data:', formData);
        
        const event = new CustomEvent('submitQuote', {
            detail: formData,
            bubbles: true,
            composed: true
        });
        
        this.dispatchEvent(event);
        
    } catch (error) {
        console.error('Form submission error:', error);
        // Error handling is now done in the Velo code
    }
}

initializeEventListeners() {
// Begin button
  this.querySelector("#beginBtn").onclick = () => this.showPage(2);


  // Previous button
  this.querySelector("#prevBtn").onclick = () => {
    if (this.currentPage === 5 && this.quoteData.Room === 'Other Spaces') {
      this.showPage(3); // Go back to room selection
      return;
    }
    this.showPage(this.currentPage - 1);
  };

 // Next button
this.querySelector("#nextBtn").onclick = () => {
  switch (this.currentPage) {
    case 1: // Handle first page if necessary
      // Add logic for first page if needed
      this.showPage(2); // Go to Personal Information page
      this.currentPage = 2; // Update currentPage
      break;

    case 2: // Personal Information
      if (!this.validateRequiredFields('page2')) {
        return;
      }

      const emailField = this.querySelector("#Email");
      const phoneField = this.querySelector("#Phone");

      if (!this.validateEmail(emailField.value)) {
        alert("Please enter a valid email address");
        emailField.classList.add('field-error');
        return;
      }

      if (!this.validatePhoneNumber(phoneField.value)) {
        alert("Please enter a valid phone number");
        phoneField.classList.add('field-error');
        return;
      }
      this.showPage(3); // Go to Room Selection page
      this.currentPage = 3; // Update currentPage
      break;

    case 3: // Room Selection
      if (!this.quoteData.Room) {
        alert("Please select a room first.");
        return;
      }

      if (this.quoteData.Room === 'Other Spaces') {
        this.quoteData.StyleSelection = 'Custom';
        this.renderDimensionsPage();
        this.showPage(5); // Go directly to dimensions page
        this.currentPage = 5; // Update currentPage
      } else {
        // For other rooms, go to the style selection page
        this.renderStyleSelectionPage();
        this.showPage(4); // Explicitly go to page 4
        this.currentPage = 4; // Update currentPage
      }
      break;

    case 4: // Style Selection
      if (!this.validateStyleSelection()) {
        alert("Please select a style first.");
        return;
      }
      this.renderDimensionsPage();
      this.showPage(5); // Go to dimensions page
      this.currentPage = 5; // Update currentPage
      break;

    case 5: // Dimensions
      if (!this.validateRequiredFields('page5')) {
        return;
      }
      if (!this.collectDimensions()) {
        alert("Please enter valid dimensions.");
        return;
      }
      this.renderReviewPage();
      this.showPage(6); // Go to review page
      this.currentPage = 6; // Update currentPage
      break;

    case 6: // Review
      this.submitQuote();
      return; // Don't increment currentPage
  }
};


// Add input event listeners for required fields
    const requiredInputs = this.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.classList.remove('field-error');
        } else {
          input.classList.add('field-error');
        }
      });
    });

// Form field validation
    const emailInput = this.querySelector("#Email");
    // In your connectedCallback method, update or add these event listeners:

// Phone number formatting
const phoneInput = this.querySelector('#Phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    // Get the raw input value
    const unformatted = e.target.value.replace(/\D/g, '');
    const formatted = this.formatPhoneNumber(unformatted);
    
    // Update the input value
    e.target.value = formatted;

    // Validate phone number - check for 10 digits
    if (unformatted.length === 10) {
      phoneInput.setCustomValidity('');
      this.quoteData.Phone = formatted;
    } else {
      phoneInput.setCustomValidity('Please enter a valid 10-digit phone number');
    }
  });

  // Prevent non-numeric input
  phoneInput.addEventListener('keypress', (e) => {
    if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
  });
}

// Zip code validation
const zipInput = this.querySelector('#Zip');
if (zipInput) {
  zipInput.addEventListener('input', (e) => {
    // Remove non-numeric characters
    e.target.value = e.target.value.replace(/\D/g, '');
    
    // Limit to 5 digits
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.slice(0, 5);
    }

    // Clear any previous validation states
    zipInput.classList.remove('field-error');
    
    // Validate zip code
    if (e.target.value.length === 5) {
      zipInput.setCustomValidity('');
      zipInput.classList.remove('field-error'); // Ensure error class is removed
      this.quoteData.Zip = e.target.value;
      this.saveFormData();
    } else {
      zipInput.setCustomValidity('Please enter a valid 5-digit zip code');
      zipInput.classList.add('field-error');
    }
  });

  // Remove blur event handler if it exists
  zipInput.removeEventListener('blur', () => {});
}

// In your initializeEventListeners method, add save calls:
emailInput?.addEventListener("input", () => {
  const email = emailInput.value;
  emailInput.setCustomValidity(
    this.validateEmail(email) ? "" : "Please enter a valid email address"
  );
  if (this.validateEmail(email)) {
    this.quoteData.Email = email;
    this.saveFormData();
  }
});

phoneInput?.addEventListener("input", () => {
  const phone = phoneInput.value;
  if (this.validatePhoneNumber(phone)) {
    phoneInput.setCustomValidity("");
    this.quoteData.Phone = phone;
    this.saveFormData();
  } else {
    phoneInput.setCustomValidity("Please enter a valid phone number");
  }
});

    // Reset form button
    this.querySelector("#resetFormBtn").onclick = () => {
      if (confirm("Are you sure you want to reset the form? All entered data will be lost.")) {
        this.resetForm();
      }
    };

    // Room selection
    const roomOptions = this.querySelectorAll(".room-option");
    roomOptions.forEach(option => {
      option.onclick = () => {
  roomOptions.forEach(o => o.classList.remove("selected"));
  option.classList.add("selected");
  this.quoteData.Room = option.dataset.room;
  this.saveFormData();
};
    });

  // Start Over button
  this.querySelector("#startOverBtn").onclick = () => {
    this.resetForm();
    this.showPage(1);
  };

  }

// Also add this helper method to collect dimensions
collectDimensions() {
  const dimensions = {};
  const inputs = this.querySelectorAll('#page5 input[type="number"]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value || input.value <= 0) {
      isValid = false;
    } else {
      dimensions[input.id] = parseFloat(input.value);
    }
  });

  if (isValid) {
    this.quoteData.dimensions = dimensions;
    this.saveFormData(); // Save after collecting dimensions
    return true;
  }
  return false;
}

clearSavedData() {
  localStorage.removeItem('formData');
  sessionStorage.clear(); // Clear any session storage as well
}

resetForm() {
  this.quoteData = {};
  const inputs = this.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.value = '';
    input.setCustomValidity('');
    input.classList.remove('field-error');
  });

  const selections = this.querySelectorAll('.room-option.selected, .style-option.selected');
  selections.forEach(el => el.classList.remove("selected"));
  
  // Clear saved data
  this.clearSavedData();
  
  // Return to first page
  this.showPage(1);
}
}


customElements.define("quote-form", QuoteForm);
