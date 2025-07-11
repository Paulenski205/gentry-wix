class QuoteForm extends HTMLElement {
removePreviousStyleSelection() {
        const selectedStyle = this.querySelector('.style-option.selected');
        if (selectedStyle) {
            selectedStyle.classList.remove('selected');
        }
}
    constructor() {
        super();
        this.currentPage = 1;
        this.quoteData = {};
        this.totalPages = 7;
        this.isReady = false;


 // Define styleOptions
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

       // THEN create and initialize buttons
    this.fullscreenBtn = this.createFullscreenButton();
    this.fullscreenBtn.id = 'fullscreenBtn';
    this.fullscreenBtn.textContent = 'Enter Fullscreen';

    this.exitFullscreenBtn = this.createExitButton();
    this.exitFullscreenBtn.id = 'exitFullscreenBtn';
    this.exitFullscreenBtn.textContent = 'Exit Fullscreen';
    this.exitFullscreenBtn.style.display = 'none';

    // Bind removePreviousStyleSelection
    this.removePreviousStyleSelection = this.removePreviousStyleSelection.bind(this);

    }

isMobile() {
    return window.innerWidth <= 768;
}

adjustFormHeight() {
    if (this.isMobile()) {
        const formBody = this.querySelector('.form-body');
        const activePage = this.querySelector('.form-page.active');

        if (formBody && activePage) {
            formBody.style.height = 'auto';
            formBody.style.height = `${activePage.scrollHeight}px`;

            setTimeout(() => {
                formBody.scrollTop = 0;
            }, 0);
        } else {
            console.error("Form body or active page not found."); // Add error handling
        }
    }
}

    setupGlobalEventListeners() {
        // Fullscreen change listener
        this.handleFullscreenChange = () => {
            if (document.fullscreenElement) {
                this.classList.add('fullscreen');
                this.fullscreenBtn.style.display = 'none';
                this.exitFullscreenBtn.style.display = 'block';
            } else {
                this.classList.remove('fullscreen');
                this.fullscreenBtn.style.display = 'block';
                this.exitFullscreenBtn.style.display = 'none';
            }
        };
        document.addEventListener('fullscreenchange', this.handleFullscreenChange);
        this.handleBeforeUnload = () => this.clearSavedData();

this.handleResize = () => {
    if (this.isMobile()) {
    this.adjustFormHeight();
}
};
window.addEventListener('resize', this.handleResize);

        this.handleStyleSelection = (event) => {
            const styleElements = event.target.closest('.style-grid').querySelectorAll('.style-option');
            styleElements.forEach(el => el.classList.remove('selected'));
            event.target.closest('.style-option').classList.add('selected');
            this.quoteData.StyleSelection = event.target.closest('.style-option').dataset.style;
            this.saveFormData();
        };

        this.handleDimensionInput = (event) => {
            if (!this.quoteData.dimensions) {
                this.quoteData.dimensions = {};
            }
            this.quoteData.dimensions[event.target.id] = parseFloat(event.target.value);
            this.saveFormData();
        };

        this.handleNotesInput = (event) => {
            this.quoteData.additionalNotes = event.target.value;
            this.saveFormData();
        };

        // Add listeners using the stored references
        document.addEventListener('fullscreenchange', this.handleFullscreenChange);
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        window.addEventListener('resize', this.handleResize);
 // Add event listeners for dynamic pages *after* the pages are rendered
    const page4 = this.querySelector('#page4');
    if (page4) {
        page4.querySelectorAll('.style-option').forEach(element => {
            element.addEventListener('click', this.handleStyleSelection);
        });
    }

    const page5 = this.querySelector('#page5');
    if (page5) {
        page5.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', this.handleDimensionInput);
        });
        const notesInput = page5.querySelector('#additional-notes');
        if (notesInput) {
            notesInput.addEventListener('input', this.handleNotesInput);
        }
    }
    }

    connectedCallback() {
        // Add loading state first
 this.innerHTML = this.getFormTemplate();

        // Create and load stylesheet
        const loadStylesheet = new Promise((resolve, reject) => {
            if (!document.querySelector('link[href*="wix-form-styles.css"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://cdn.jsdelivr.net/gh/Paulenski205/gentry-wix@3a021bb8e22228b10d95735ca914605668b0d038/wix-form-styles.css";
                link.onload = () => resolve();
                link.onerror = () => reject();
                document.head.appendChild(link);
            } else {
                resolve();
            }
        });

 // Append buttons to the form container
    const formContainer = this.querySelector('.quote-form-container');
    if (formContainer) {
        formContainer.appendChild(this.fullscreenBtn);
        formContainer.appendChild(this.exitFullscreenBtn);
    } else {
        // Handle the case where the form container is not found (e.g., log an error)
        console.error("Form container not found. Cannot append fullscreen buttons.");
    }

this.handleResize = () => {
        if (this.isMobile()) {
            this.adjustFormHeight();
            // ... other resize logic if needed
        }
    };
    window.addEventListener('resize', this.handleResize);


        // Initialize the form when everything is ready
        Promise.all([loadStylesheet, document.fonts.ready])
            .then(() => {
                setTimeout(() => {
                    this.initializeForm();
                }, 100);
            })
            .catch(error => {
                console.error('Error loading resources:', error);
                this.initializeForm();
            });
    }

getFormTemplate() {
    try {
        return `
            <div class="loading-state">
                <div class="loading-spinner"></div>
            </div>
            <div class="quote-form-container">
                <div class="custom-popup" style="display: none;">
                    <div class="popup-content">
                        <h3>Required Fields</h3>
                        <p>Please fill out all required fields marked with *</p>
                        <button class="popup-close">OK</button>
                    </div>
                </div>
                <div class="popup-overlay" style="display: none;"></div>
                <div class="form-body">
                    ${this.getFormPages()}
                </div>
                ${this.getFormNavigation()}
            </div>
        `;
    } catch (error) {
        console.error('Error generating form template:', error);
        return '<div>Error loading form</div>';
    }
}

getFormNavigation() {
    return `
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
}

	
initializeForm() {
    const loadingState = this.querySelector('.loading-state');
    const formContainer = this.querySelector('.quote-form-container');

    if (!formContainer) {
        console.error('Form container not found');
        return;
    }

    if (loadingState) {
        loadingState.remove();
    }

    formContainer.classList.add('ready');

    if (this.isMobile()) {
        formContainer.appendChild(this.fullscreenBtn);
        formContainer.appendChild(this.exitFullscreenBtn);
    } else { // Remove fullscreen buttons if not on mobile
        if (this.fullscreenBtn) this.fullscreenBtn.remove();
        if (this.exitFullscreenBtn) this.exitFullscreenBtn.remove();
    }

    // Bind render methods *before* setupGlobalEventListeners
    this.renderStyleSelectionPage = this.renderStyleSelectionPage.bind(this);
    this.renderDimensionsPage = this.renderDimensionsPage.bind(this);
    this.renderReviewPage = this.renderReviewPage.bind(this);

    this.setupGlobalEventListeners(); // Call after binding render methods
    this.initializeEventListeners();
    this.loadFormData();

    // Adjust form height if needed, after loadFormData
    if (this.isMobile()) {
        this.adjustFormHeight();
    }
}

    setupGlobalEventListeners() {
        // Fullscreen change listener
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                this.classList.remove('fullscreen');
                this.exitFullscreenBtn.style.display = 'none';
                this.fullscreenBtn.style.display = 'block';
            } else {
                this.classList.add('fullscreen');
                this.exitFullscreenBtn.style.display = 'block';
                this.fullscreenBtn.style.display = 'none';
            }
        });

        // Message handler
        window.addEventListener('message', (event) => {
            if (event.data.type === 'success') {
                this.showPage(7); // Show thank you page
            } else if (event.data.type === 'error') {
                this.showPage(1); // Go back to first page
            }
        });

        // Resize listener
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                if (!this.querySelector('#fullscreenBtn')) {
                    this.fullscreenBtn = this.createFullscreenButton();
                    this.fullscreenBtn.id = 'fullscreenBtn';
                    this.fullscreenBtn.textContent = 'Enter Fullscreen';
                    this.querySelector('.quote-form-container').appendChild(this.fullscreenBtn);
                }
            } else {
                const fullscreenBtn = this.querySelector('#fullscreenBtn');
                if (fullscreenBtn) {
                    fullscreenBtn.remove();
                }
            }
        });

        // Page unload listener
        window.addEventListener('beforeunload', () => {
            this.clearSavedData();
        });
    }

// Helper methods for button creation
createFullscreenButton() {
    const btn = document.createElement('button');
    btn.id = 'fullscreenBtn';
    btn.textContent = 'Enter Fullscreen';
    btn.addEventListener('click', () => this.toggleFullscreen()); // Call toggleFullscreen method
    return btn;
}

createExitButton() {
    const btn = document.createElement('button');
    btn.id = 'exitFullscreenBtn';
    btn.textContent = 'Exit Fullscreen';
    btn.addEventListener('click', () => document.exitFullscreen()); // Simplified
    btn.style.display = 'none'; // Initially hidden
    return btn;
}

// Define toggleFullscreen method:
async toggleFullscreen() {
    try {
        if (!document.fullscreenElement) {
            await this.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    } catch (err) {
        console.error('Error attempting to toggle fullscreen:', err);
        this.showErrorPopup("An error occurred while toggling fullscreen mode.  Please try again."); // Use your error popup method
    }
}

showErrorPopup(message) {
    this.showPopup(message || 'An error occurred.');
}


    // Validation Methods
    validateZipCode(value) {
        return /^\d{5}$/.test(value);
    }

    validatePhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length === 10;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

validateRequiredFields(pageId) {
    const inputs = this.querySelectorAll(`#${pageId} [required]`);
    let isValid = true;

    inputs.forEach(input => {
        if (input.id === 'Zip') {
            if (!input.value.trim() || input.value.length !== 5) {
                input.classList.add('field-error');
                isValid = false;
            } else {
                input.classList.remove('field-error'); // Remove if valid
            }
        } else { // For all other required fields
            if (!input.value.trim()) {
                input.classList.add('field-error');
                isValid = false;
            } else {
                input.classList.remove('field-error'); // Remove if valid
            }
        }
    });

    if (!isValid) {
        this.showPopup('Please fill out all required fields marked with *');
    }

    return isValid;
}

    validateStyleSelection() {
        const styleGrid = this.querySelector('.style-grid');
        const requiredMessage = this.querySelector('.style-selection-required');
        
        const hasSelection = this.quoteData.StyleSelection && 
                            this.querySelector('.style-option.selected');
        
        if (!hasSelection) {
            requiredMessage.classList.add('show');
            return false;
        }
        
        styleGrid.classList.remove('field-error');
        requiredMessage.classList.remove('show');
        return true;
    }

    // Formatting Methods
    formatPhoneNumber(value) {
        const cleaned = value.replace(/\D/g, '');
        const limited = cleaned.slice(0, 10);
        
        if (limited.length === 0) return '';
        
        const areaCode = limited.slice(0, 3);
        const middle = limited.slice(3, 6);
        const last = limited.slice(6);
        
        if (limited.length <= 3) return '(' + limited;
        if (limited.length <= 6) return '(' + areaCode + ') ' + middle;
        return '(' + areaCode + ') ' + middle + '-' + last;
    }

    // UI Interaction Methods
    showPopup(message) {
        const popup = this.querySelector('.custom-popup');
        const overlay = this.querySelector('.popup-overlay');
        const messageElement = popup.querySelector('p');
        
        if (message) {
            messageElement.textContent = message;
        }
        
        popup.style.display = 'block';
        overlay.style.display = 'block';
        
        const closeBtn = popup.querySelector('.popup-close');
        closeBtn.onclick = () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        };
    }

showPage(pageNum) {
    console.log(`Showing page ${pageNum}, current page was ${this.currentPage}`);
    
    // Validate page number
    if (pageNum < 1 || pageNum > 7) {
        console.error(`Invalid page number: ${pageNum}`);
        return;
    }
    
    // CRITICAL: Prevent skipping to thank you page
    if (pageNum === 7 && this.currentPage !== 6) {
        console.error(`BLOCKED: Attempted to jump to thank you page from page ${this.currentPage}`);
        console.trace(); // Show stack trace
        this.showErrorPopup("Please complete all steps in order.");
        return; // Exit without changing pages
    }
    
    // Check if the target page exists
    const targetPage = this.querySelector(`#page${pageNum}`);
    if (!targetPage) {
        console.error(`Page ${pageNum} not found in the DOM`);
        return;
    }
    
    // Update page visibility
    const pages = this.querySelectorAll(".form-page");
    pages.forEach((pg, i) => {
        pg.classList.toggle("active", i === pageNum - 1);
    });
    
    // Log which page is now active
    setTimeout(() => {
        const activePage = this.querySelector('.form-page.active');
        console.log(`Active page after navigation: ${activePage ? activePage.id : "none"}`);
    }, 0);
    
    // Update navigation buttons
    const beginButton = this.querySelector("#beginBtn");
    const prevButton = this.querySelector("#prevBtn");
    const nextButton = this.querySelector("#nextBtn");
    const startOverButton = this.querySelector("#startOverBtn");
    
    if (pageNum === 1) {
        beginButton.style.display = "block";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        startOverButton.style.display = "none";
    } else if (pageNum === 7) {
        beginButton.style.display = "none";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        startOverButton.style.display = "block";
    } else {
        beginButton.style.display = "none";
        prevButton.style.display = "block";
        nextButton.style.display = "block";
        startOverButton.style.display = "none";
        
        if (pageNum === 6) {
            nextButton.textContent = "Submit";
            nextButton.style.backgroundColor = "var(--success-color)";
        } else {
            nextButton.textContent = "Next";
            nextButton.style.backgroundColor = "var(--primary-color)";
        }
    }

    // Scroll to top for better user experience
    if (pageNum > 1 && this.classList.contains('fullscreen')) {
        setTimeout(() => {
            const formBody = this.querySelector('.form-body');
            if (formBody) {
                formBody.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 0);
    }

    // Save form data and update current page
    this.saveFormData();
    this.currentPage = pageNum;
    
    // Adjust height for mobile devices
    if (this.isMobile()) {
        this.adjustFormHeight();
    }
    
    // For debugging: check which pages are visible after navigation
    setTimeout(() => {
        this.debugCheckVisiblePages();
    }, 100);
}

// Add this helper method if you don't have it already
debugCheckVisiblePages() {
    console.log("Page visibility check:");
    const pages = this.querySelectorAll('.form-page');
    pages.forEach(page => {
        const isActive = page.classList.contains('active');
        const display = window.getComputedStyle(page).display;
        console.log(`- ${page.id}: active=${isActive}, display=${display}`);
    });
}

getFormPages() {
    return `
        <div class="form-page welcome-page active" id="page1">
            <div class="image-banner"><h1>Your Dream Design</h1></div>
        </div>
        <div class="form-page" id="page2">
            ${this.getPage2Template()}
        </div>
        <div class="form-page" id="page3">
            ${this.getPage3Template()}
        </div>
    `;
}

getPage2Template() {
    return `
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
    `;
}

getPage3Template() {
    return `
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
    `;
}

renderStyleSelectionPage(selectedRoom) {
    return new Promise((resolve, reject) => { // Add reject for error handling
      try {
  const formBody = this.querySelector('.form-body');
        if (!formBody) {
            reject(new Error("Form body not found.")); // Reject the promise if formBody is not found
            return;
        }

        let page4 = this.querySelector('#page4');
        if (!page4) {
            page4 = document.createElement('div');
            page4.id = 'page4';
            page4.className = 'form-page';
            formBody.appendChild(page4);
        }

        const selectedRoom = this.quoteData.Room;
        const styles = this.styleOptions[this.quoteData.Room] || [];
        page4.innerHTML = this.getStyleSelectionTemplate(styles);
        this.initializeStyleSelectionListeners(page4);

        if (this.isMobile()) {
            this.adjustFormHeight();
        }
resolve(); // Resolve the promise *here*, after successful rendering
        } catch (error) {
            console.error("Error rendering style selection page:", error); // Log the error
            this.showErrorPopup("An error occurred while rendering the style selection page. Please try again.");
            reject(error); // Reject the promise if an error occurs
        }
    });
}

getStyleSelectionTemplate(styles) {
    return `
        <div class="required-note">*Required</div>
        <h2>Select Your Style</h2>
        <div class="style-grid">
            ${styles.map(style => `
                <div class="style-option ${this.quoteData.StyleSelection === style.name ? 'selected' : ''}" 
                     data-style="${style.name}">
                    <img src="${style.image}" alt="${style.name} style">
                    <label>${style.name}</label>
                </div>
            `).join('')}
        </div>
        <div class="style-selection-required">Please select a style to continue</div>
    `;
}

getDimensionsTemplate(roomType) {
    return `
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallA">Wall A Length (inches)</label>
            <input type="number" id="wallA" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallB">Wall B Length (inches)</label>
            <input type="number" id="wallB" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallC">Wall C Length (inches)</label>
            <input type="number" id="wallC" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallD">Wall D Length (inches)</label>
            <input type="number" id="wallD" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="ceiling">Ceiling Height (inches)</label>
            <input type="number" id="ceiling" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
    `;
}

getDimensionFields(roomType) {
    switch(roomType) {
        case 'Kitchens':
            return `
                <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallA">Wall A Length (inches)</label>
            <input type="number" id="wallA" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallB">Wall B Length (inches)</label>
            <input type="number" id="wallB" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallC">Wall C Length (inches)</label>
            <input type="number" id="wallC" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallD">Wall D Length (inches)</label>
            <input type="number" id="wallD" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="ceiling">Ceiling Height (inches)</label>
            <input type="number" id="ceiling" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
            `;
break;
        case 'Bathrooms':
            return `
                 <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallA">Wall A Length (inches)</label>
            <input type="number" id="wallA" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallB">Wall B Length (inches)</label>
            <input type="number" id="wallB" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="ceiling">Ceiling Height (inches)</label>
            <input type="number" id="ceiling" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
            `;
break;
        case 'Closets':
            return `
                <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallA">Wall A Length (inches)</label>
            <input type="number" id="wallA" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallB">Wall B Length (inches)</label>
            <input type="number" id="wallB" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
<div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallA">Wall C Length (inches)</label>
            <input type="number" id="wallC" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallB">Wall D Length (inches)</label>
            <input type="number" id="wallD" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="ceiling">Ceiling Height (inches)*</label>
            <input type="number" id="ceiling" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
            `;
break;
        case 'Other Spaces': // Explicit case for Other Spaces
            return `
                <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallA">Wall A Length (inches)</label>
            <input type="number" id="wallA" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallB">Wall B Length (inches)</label>
            <input type="number" id="wallB" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
<div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallC">Wall C Length (inches)</label>
            <input type="number" id="wallC" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallD">Wall D Length (inches)</label>
            <input type="number" id="wallD" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="ceiling">Ceiling Height (inches)</label>
            <input type="number" id="ceiling" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
<div class="form-group">
            <label for="roomName">Room Name</label>
            <input type="text" id="roomName" placeholder="Optional">
          </div>
        </div>
            `;
    }
}

page5 = null;

renderDimensionsPage(selectedRoom) {
    console.log(`Rendering dimensions page for ${selectedRoom}`);
    
    return new Promise((resolve, reject) => {
        try {
            const formBody = this.querySelector('.form-body');
            if (!formBody) {
                throw new Error("Form body not found.");
            }

            // Always create a fresh page5
            let page5 = this.querySelector('#page5');
            if (page5) {
                console.log("Removing existing page5");
                page5.remove();
            }
            
            page5 = document.createElement('div');
            page5.id = 'page5';
            page5.className = 'form-page';
            formBody.appendChild(page5);
            this.page5 = page5;
            
            console.log("Created new page5 element");

            // Use the appropriate template based on room type
            const dimensionsTemplate = selectedRoom === 'Other Spaces' 
                ? this.getOtherSpacesDimensionsTemplate() 
                : this.getDimensionsTemplate();
                
            page5.innerHTML = this.getDimensionsPageTemplate(dimensionsTemplate);
            
            console.log("Page5 HTML content set");
            
            // Initialize event listeners for the new page
            this.initializeDimensionsListeners();
            console.log("Dimensions listeners initialized");

            if (this.isMobile()) {
                this.adjustFormHeight();
            }
            
            console.log("Dimensions page rendering complete");
            resolve();
        } catch (error) {
            console.error("Error in renderDimensionsPage:", error);
            reject(error);
        }
    });
}

getDimensionsPageTemplate(dimensionsTemplate) {
    return `
        <div class="required-note">*Required</div>
        <h2>Room Dimensions</h2>
        ${this.getWallDiagramTemplate()}
        <div class="form-content">
            ${dimensionsTemplate}
        </div>
    `;
}

getDimensionsTemplate() { // No roomType parameter needed
        return `
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallA">Wall A Length (inches)</label>
            <input type="number" id="wallA" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallB">Wall B Length (inches)</label>
            <input type="number" id="wallB" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="wallC">Wall C Length (inches)</label>
            <input type="number" id="wallC" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
          <div class="form-group">
            <label for="wallD">Wall D Length (inches)</label>
            <input type="number" id="wallD" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
        <div class="form-row dimensions-row">
          <div class="form-group">
            <label for="ceiling">Ceiling Height (inches)</label>
            <input type="number" id="ceiling" min="1" step="0.1" placeholder="Optional" inputmode="numeric">
          </div>
        </div>
<div class="form-row"><div class="form-group full-width">
            <label for="additional-notes">Additional Notes (optional)</label>
            <textarea id="additional-notes" rows="4" placeholder="Special features/requests, details of room layout, etc."></textarea>
        </div></div>
    `;
}

getOtherSpacesDimensionsTemplate() {
    return `
        <div class="form-row dimensions-row">
            <div class="form-group">
                <label for="wallA">Wall A Length (inches)</label>
                <input type="number" id="wallA" min="1" step="0.1" placeholder="Enter Wall A Length" inputmode="numeric">
            </div>
            <div class="form-group">
                <label for="wallB">Wall B Length (inches)</label>
                <input type="number" id="wallB" min="1" step="0.1" placeholder="Enter Wall B Length" inputmode="numeric">
            </div>
        </div>
        <div class="form-row dimensions-row">
            <div class="form-group">
                <label for="wallC">Wall C Length (inches)</label>
                <input type="number" id="wallC" min="1" step="0.1" placeholder="Enter Wall C Length" inputmode="numeric">
            </div>
            <div class="form-group">
                <label for="wallD">Wall D Length (inches)</label>
                <input type="number" id="wallD" min="1" step="0.1" placeholder="Enter Wall D Length" inputmode="numeric">
            </div>
        </div>
        <div class="form-row dimensions-row">
            <div class="form-group">
                <label for="ceiling">Ceiling Height (inches)</label>
                <input type="number" id="ceiling" min="1" step="0.1" placeholder="Enter Ceiling Height" inputmode="numeric">
            </div>
            <div class="form-group">
                <label for="roomName">Room Name</label>
                <input type="text" id="roomName" placeholder="Enter Name"></div>
				</div>
				        <div class="form-group full-width">
            <label for="additional-notes">Additional Notes (optional)</label>
            <textarea id="additional-notes" rows="4" placeholder="Special features/requests, details of room layout, etc."></textarea>
        </div>
    `;
}

getWallDiagramTemplate() {
    return `
        <div class="wall-diagram">
            <div class="square">
                <span class="wall-label top">Wall A</span>
                <span class="wall-label right">Wall B</span>
                <span class="wall-label bottom">Wall C</span>
                <span class="wall-label left">Wall D</span>
            </div>
            <p class="diagram-note">Please measure each wall length. Start with your main wall as "Wall A" and continue clockwise.</p>
        </div>
    `;
}

renderReviewPage() {
    return new Promise((resolve, reject) => {
        try {
            const formBody = this.querySelector('.form-body');
            if (!formBody) {
                throw new Error("Form body not found.");
            }

            let page6 = this.querySelector('#page6');
            if (!page6) {
                page6 = document.createElement('div');
                page6.id = 'page6';
                page6.className = 'form-page';
                formBody.appendChild(page6);
            }

            const dimensions = this.quoteData.dimensions || {};
            const additionalNotes = this.quoteData.additionalNotes;

            const hasDimensions = Object.entries(dimensions)
                .filter(([key]) => key !== 'roomName')
                .some(([key, value]) => value !== undefined && value !== '');

            // Declare dimensionsHtml only *once*, outside the if/else block
            let dimensionsHtml = ""; 

            if (this.quoteData.Room === 'Other Spaces') {
                dimensionsHtml = Object.entries(dimensions)
                    .filter(([key]) => key !== 'roomName')
                    .map(([key, value]) => `
                        <div class="review-item">
                            <span class="review-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <span class="review-value">${value} inches</span>
                        </div>
                    `)
                    .join('');
            } else {
                // Use the same logic as for "Other Spaces" to exclude roomName
                dimensionsHtml = Object.entries(dimensions)
                    .filter(([key]) => key !== 'roomName')
                    .map(([key, value]) => `
                        <div class="review-item">
                            <span class="review-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <span class="review-value">${value} inches</span>
                        </div>
                    `).join('');
            }

            const hasAdditionalNotes = !!additionalNotes;
            page6.innerHTML = this.getReviewPageTemplate(dimensionsHtml, hasDimensions, additionalNotes, hasAdditionalNotes);

            if (this.isMobile()) {
                this.adjustFormHeight();
            }
console.log("Review page rendering complete");
            resolve();
        } catch (error) {
            console.error("Error rendering review page:", error);
            this.showErrorPopup("An error occurred while rendering the review page. Please try again.");
            reject(error); // Make sure to reject the promise on error
        }
    });
}

getReviewPageTemplate(dimensionsHtml, hasDimensions, additionalNotes, hasAdditionalNotes) {
let roomTypeDisplay = this.quoteData.Room || '';
    if (this.quoteData.Room === 'Other Spaces') {
        const dimensions = this.quoteData.dimensions || {};
        roomTypeDisplay = dimensions.roomName || 'Other Space'; // Access the *value* of roomName
    }

     const dimensionsSection = hasDimensions ? `
        <div class="review-section">
            <h3>Room Dimensions</h3>
            <div class="review-grid dimensions-grid">
                ${dimensionsHtml}
            </div>
            ${hasAdditionalNotes ? `
                <div class="review-item">
                    <span class="review-label">Additional Notes</span>
                    <span class="review-value">${additionalNotes}</span>
                </div>
            ` : ''}
        </div>  </div> </div>
    ` : ''; // Close dimensions-grid, review-section if hasDimensions

    const additionalNotesSection = hasAdditionalNotes ? `
        <div class="review-section">
            <h3>Additional Notes</h3>
            <div class="review-item">
                <span class="review-value">${additionalNotes}</span>
            </div>
        </div>
    ` : '';

    // Conditionally render Style Selection ONLY if it's set and not "Other Spaces"
    const styleSelectionSection = this.quoteData.StyleSelection && this.quoteData.Room !== 'Other Spaces' ? `
        <div class="review-item">
            <span class="review-label">Style Selection</span>
            <span class="review-value">${this.quoteData.StyleSelection}</span>
        </div>
    ` : '';


    return `
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
                                ${this.querySelector('#AddressLine2')?.value || ''}<br>
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
                            <span class="review-value">${roomTypeDisplay}</span>
                        </div>
                        ${styleSelectionSection}
                    </div>
                </div>

                ${dimensionsSection}  ${additionalNotesSection} </div> </div> </div> </div>
    `;
}
	
    // Form Data Handling Methods
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



    loadFormData() {
        const savedData = localStorage.getItem('formData');
    if (!savedData) return; // Return early if no saved data

    const formData = JSON.parse(savedData);
            
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
            
            if (formData.quoteData) {
                this.quoteData = formData.quoteData;
                
                if (this.quoteData.Room) {
                    const roomOption = this.querySelector(`.room-option[data-room="${this.quoteData.Room}"]`);
                    if (roomOption) {
                        roomOption.classList.add('selected');
                    }
                }

                // Check if dimensions or additional notes exist in saved data
        if (formData.quoteData.dimensions || formData.quoteData.additionalNotes) {
            if (!this.page5) { // Dimensions page not rendered yet
                this.renderDimensionsPage(this.quoteData.Room)
                    .then(() => this.restoreDimensionsAndNotes(formData.quoteData));
            } else { // Dimensions page already rendered
                this.restoreDimensionsAndNotes(formData.quoteData);
            }
        }
    }
}

// Helper function to restore dimensions and additional notes
restoreDimensionsAndNotes(quoteData) {
    if (quoteData.dimensions) {
        for (const [key, value] of Object.entries(quoteData.dimensions)) {
            const input = this.page5.querySelector(`#${key}`); // Query inside this.page5
            if (input) {
                input.value = value;
            }
        }
    }

    if (quoteData.additionalNotes) {
        const notesInput = this.page5.querySelector('#additional-notes'); // Query inside this.page5
        if (notesInput) {
            notesInput.value = quoteData.additionalNotes;
        }
    }
}

    clearSavedData() {
        localStorage.removeItem('formData');
        sessionStorage.clear();
    }

initializePopupListeners() {
    // Find popup elements
    const popup = this.querySelector('.custom-popup');
    const overlay = this.querySelector('.popup-overlay');
    const closeBtn = popup.querySelector('.popup-close');
    
    // Add click event to close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });
    }
    
    // Optional: Close popup when clicking on overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });
    }
}

    // Event Listeners Initialization
    initializeEventListeners() {
        this.initializeButtonListeners();
        this.initializeInputListeners();
        this.initializeRoomSelectionListeners();
        this.initializePopupListeners();
    }

    initializeButtonListeners() {
        // Begin button
        const beginButton = this.querySelector("#beginBtn");
        beginButton.addEventListener('click', async () => {
            if (window.innerWidth <= 768) {
                try {
                    await this.requestFullscreen();
                    this.classList.add('fullscreen');
                    this.exitFullscreenBtn.style.display = 'block';
                    this.fullscreenBtn.style.display = 'none';
                } catch (err) {
                    console.error('Error attempting to enter fullscreen:', err);
                }
            }
            this.showPage(2);
        });

        // Previous button
        this.querySelector("#prevBtn").onclick = () => {
            if (this.currentPage === 5 && this.quoteData.Room === 'Other Spaces') {
                this.showPage(3);
                return;
            }
            this.showPage(this.currentPage - 1);
        };

        // Next button
        this.querySelector("#nextBtn").onclick = () => this.handleNextButtonClick();

        // Reset form button
        this.querySelector("#resetFormBtn").onclick = () => {
            if (confirm("Are you sure you want to reset the form? All entered data will be lost.")) {
                this.resetForm();
            }
        };

        // Start over button
        this.querySelector("#startOverBtn").onclick = () => {
            this.resetForm();
            this.showPage(1);
        };
    }

    initializeInputListeners() {
        // Phone number formatting
        const phoneInput = this.querySelector('#Phone');
        if (phoneInput) {
            this.initializePhoneInput(phoneInput);
        }

        // ZIP code validation
        const zipInput = this.querySelector('#Zip');
        if (zipInput) {
            this.initializeZipInput(zipInput);
        }

        // Email validation
        const emailInput = this.querySelector('#Email');
        if (emailInput) {
            this.initializeEmailInput(emailInput);
        }
    }

initializePhoneInput(phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        const unformatted = e.target.value.replace(/\D/g, '');
        const formatted = this.formatPhoneNumber(unformatted);
        e.target.value = formatted;

        if (unformatted.length === 10) {
            phoneInput.setCustomValidity('');
            phoneInput.classList.remove('field-error');
            // phoneInput.classList.add('field-valid'); // Consider removing if not using green border
            this.quoteData.Phone = formatted;
        } else {
            phoneInput.setCustomValidity('Please enter a valid 10-digit phone number');
            phoneInput.classList.add('field-error');
            // phoneInput.classList.remove('field-valid'); // Consider removing if not using green border
        }
    });

    // Add blur listener for final validation and popup
    phoneInput.addEventListener('blur', () => {
        const unformatted = phoneInput.value.replace(/\D/g, ''); // Clean the number for validation
        if (unformatted.length !== 10) {
            this.showPopup('Please enter a valid 10-digit phone number');
        }
    });

    phoneInput.addEventListener('keypress', (e) => {
        if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    });
}


 initializeZipInput(zipInput) {
    zipInput.addEventListener('input', (e) => {
        // First check if the field is empty
        if (!e.target.value) {
            zipInput.classList.add('field-error');
            zipInput.classList.remove('field-valid');
            zipInput.setCustomValidity('ZIP code is required');
            return;
        }

        // Sanitize input (remove non-digits, limit to 5)
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
        
        // Validate length
        if (e.target.value.length === 5) {
            zipInput.classList.remove('field-error');
            zipInput.classList.add('field-valid');
            zipInput.setCustomValidity('');
            this.quoteData.Zip = zipInput.value;
            this.saveFormData();
        } else {
            zipInput.classList.add('field-error');
            zipInput.classList.remove('field-valid');
            zipInput.setCustomValidity('Please enter a valid 5-digit zip code');
        }
    });

    // Add blur event for validation when leaving the field
    zipInput.addEventListener('blur', () => {
        if (!zipInput.value && !this.validateZipCode(zipInput.value)) { // Check both conditions
            this.showPopup('ZIP code is required and must be 5 digits');
        }
    });

    // Add focus event to clear error state when user starts typing again
    zipInput.addEventListener('focus', () => {
        if (zipInput.classList.contains('field-error')) {
            zipInput.setCustomValidity('');
        }
    });
}
  
initializeEmailInput(emailInput) {
    emailInput.addEventListener('input', () => {
        const email = emailInput.value;
        if (this.validateEmail(email)) {
            emailInput.setCustomValidity('');
            emailInput.classList.remove('field-error');
            // emailInput.classList.add('field-valid'); // Consider removing this
            this.quoteData.Email = email;
            this.saveFormData();
        } else {
            emailInput.setCustomValidity('Please enter a valid email address');
            emailInput.classList.add('field-error');
            // emailInput.classList.remove('field-valid'); // Consider removing this
        }
    });

    // Add blur listener for final validation and popup
    emailInput.addEventListener('blur', () => {
        if (!this.validateEmail(emailInput.value)) {
            this.showPopup('Please enter a valid email address');
        }
    });
}


    initializeRoomSelectionListeners() {
        const roomOptions = this.querySelectorAll(".room-option");
        roomOptions.forEach(option => {
            option.onclick = () => {
                roomOptions.forEach(o => o.classList.remove("selected"));
                option.classList.add("selected");
                this.quoteData.Room = option.dataset.room;
                this.saveFormData();
            };
        });
    }

initializeStyleSelectionListeners(page4) {
    if (!page4) {
        console.error('Style selection page not found');
        return;
    }

    const styleElements = page4.querySelectorAll('.style-option');
    const styleGrid = page4.querySelector('.style-grid');
    const requiredMessage = page4.querySelector('.style-selection-required');

    // Assign the event handler as a class property
    this.handleStyleSelection = (event) => {
        styleElements.forEach(el => el.classList.remove('selected'));
        event.target.closest('.style-option').classList.add('selected');
        this.quoteData.StyleSelection = event.target.closest('.style-option').dataset.style;
        styleGrid.classList.remove('field-error');
        requiredMessage.classList.remove('show');
        this.saveFormData();
    };

    styleElements.forEach(element => {
        element.addEventListener('click', this.handleStyleSelection); // Use the assigned handler
    });


    if (this.quoteData.StyleSelection) {
        const preselectedStyle = page4.querySelector(`.style-option[data-style="${this.quoteData.StyleSelection}"]`);
        if (preselectedStyle) {
            preselectedStyle.classList.add('selected');
        }
    }
}

initializeDimensionsListeners(page5) {
    if (!page5) {
        console.error('Dimensions page not found');
        return;
    }

    const dimensionInputs = page5.querySelectorAll('input[type="number"]');
    const notesInput = page5.querySelector('#additional-notes');

    // Assign dimension input handler
    this.handleDimensionInput = (event) => {
        this.quoteData.dimensions = this.quoteData.dimensions || {}; // Ensure dimensions object exists
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) { // Check if the parsed value is a number
            this.quoteData.dimensions[event.target.id] = value;
            this.saveFormData();
        }
    };

    dimensionInputs.forEach(input => {
        input.addEventListener('input', this.handleDimensionInput);

        // Restore saved values (if any)
        if (this.quoteData.dimensions && this.quoteData.dimensions[input.id]) {
            input.value = this.quoteData.dimensions[input.id];
        }
    });

    // Assign notes input handler
    this.handleNotesInput = (event) => {
        this.quoteData.additionalNotes = event.target.value;
        this.saveFormData();
    };

    if (notesInput) {
        notesInput.addEventListener('input', this.handleNotesInput);

        // Restore saved notes (if any)
        if (this.quoteData.additionalNotes) {
            notesInput.value = this.quoteData.additionalNotes;
        }
    }
}


// initializeDimensionsListeners (using this.page5):
initializeDimensionsListeners() {
    console.log("Initializing dimensions listeners");
    
    if (!this.page5) {
        console.error("Cannot initialize dimensions listeners: page5 is null");
        return;
    }

    // Find all number inputs on page5
    const dimensionInputs = this.page5.querySelectorAll('input[type="number"]');
    console.log(`Found ${dimensionInputs.length} dimension inputs`);
    
    // Find the notes textarea
    const notesInput = this.page5.querySelector('#additional-notes');
    console.log(`Notes input found: ${!!notesInput}`);
    
    // Find the room name input (for Other Spaces)
    const roomNameInput = this.page5.querySelector('#roomName');
    console.log(`Room name input found: ${!!roomNameInput}`);

    // Initialize the dimensions object if it doesn't exist
    this.quoteData.dimensions = this.quoteData.dimensions || {};

    // Add event listeners to dimension inputs
    dimensionInputs.forEach(input => {
        // Remove any existing listeners (just in case)
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);
        
        // Add fresh listener
        newInput.addEventListener('input', (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                this.quoteData.dimensions[event.target.id] = value;
                console.log(`Updated dimension ${event.target.id}: ${value}`);
                this.saveFormData();
            }
        });
        
        // Restore saved value if available
        if (this.quoteData.dimensions[newInput.id]) {
            newInput.value = this.quoteData.dimensions[newInput.id];
            console.log(`Restored value for ${newInput.id}: ${newInput.value}`);
        }
    });

    // Add event listener to notes input
    if (notesInput) {
        // Remove any existing listeners
        const newNotesInput = notesInput.cloneNode(true);
        notesInput.parentNode.replaceChild(newNotesInput, notesInput);
        
        // Add fresh listener
        newNotesInput.addEventListener('input', (event) => {
            this.quoteData.additionalNotes = event.target.value;
            console.log("Updated additional notes");
            this.saveFormData();
        });
        
        // Restore saved notes if available
        if (this.quoteData.additionalNotes) {
            newNotesInput.value = this.quoteData.additionalNotes;
            console.log("Restored additional notes");
        }
    }
    
    // Add event listener to room name input (for Other Spaces)
    if (roomNameInput) {
        // Remove any existing listeners
        const newRoomNameInput = roomNameInput.cloneNode(true);
        roomNameInput.parentNode.replaceChild(newRoomNameInput, roomNameInput);
        
        // Add fresh listener
        newRoomNameInput.addEventListener('input', (event) => {
            this.quoteData.dimensions.roomName = event.target.value;
            console.log(`Updated room name: ${event.target.value}`);
            this.saveFormData();
        });
        
        // Restore saved room name if available
        if (this.quoteData.dimensions.roomName) {
            newRoomNameInput.value = this.quoteData.dimensions.roomName;
            console.log(`Restored room name: ${newRoomNameInput.value}`);
        }
    }
    
    console.log("Dimensions listeners initialization complete");
}

// Helper function to validate and collect a single dimension
validateAndCollectDimension(input, key) {
    if (!input) {
        console.error(`Input element for ${key} not found.`);
        return false;
    }

    if (input?.value.trim() !== '') { // Optional chaining here
        const value = parseFloat(input.value);
        if (isNaN(value) || value <= 0) {
            input.classList.add('field-error');
            return false;
        } else {
            this.quoteData.dimensions[key] = value;
            input.classList.remove('field-error');
        }
    }
    return true;
}

collectDimensions() {
    this.quoteData.dimensions = this.quoteData.dimensions || {};
    let isValid = true;

    if (this.quoteData.Room === 'Other Spaces') {
        const wallAInput = this.querySelector('#wallA');
        const wallBInput = this.querySelector('#wallB');
        const wallCInput = this.querySelector('#wallC');
        const wallDInput = this.querySelector('#wallD');
        const ceilingInput = this.querySelector('#ceiling');
        const roomNameInput = this.querySelector('#roomName'); // Or #customlocation

        // Validate dimensions (optional fields) - number inputs only
        isValid = this.validateNumberInput(wallAInput) && isValid; // Use helper function for number inputs
        isValid = this.validateNumberInput(wallBInput) && isValid;
        isValid = this.validateNumberInput(wallCInput) && isValid;
        isValid = this.validateNumberInput(wallDInput) && isValid;
        isValid = this.validateNumberInput(ceilingInput) && isValid;

        // Store roomName (no validation needed if it's optional)
        this.quoteData.dimensions.roomName = roomNameInput?.value || '';

 console.log(`Collecting dimensions for Other Spaces, validation result: ${isValid}`);

        if (!isValid) { // Check only number input validity
            this.showErrorPopup("Please enter valid dimensions for Other Spaces.  Values must be greater than zero if entered.");
            return false;
        }
    } else { // For other room types
        // Use the same validation logic as for "Other Spaces"
        let isValidDimensions = true;
        const inputs = this.querySelectorAll('#page5 input[type="number"]');
        inputs.forEach(input => isValidDimensions = this.validateNumberInput(input) && isValidDimensions); // Use helper function
console.log(`Collecting dimensions for ${this.quoteData.Room}, validation result: ${isValidDimensions}`);

        if (!isValidDimensions) {
            this.showErrorPopup("Please enter valid dimensions. Values must be greater than zero if entered.");
            return false;
        }
    }

    // If all validations pass:
    this.saveFormData();
    return true;
}

// Helper function to validate number inputs
validateNumberInput(input) {
    if (!input) return false; // Handle missing input

    if (input.value.trim() !== '') { // Only validate if a value is entered
        const value = parseFloat(input.value);
        if (isNaN(value) || value <= 0) {
            input.classList.add('field-error');
            return false;
        } else {
            this.quoteData.dimensions[input.id] = value; // Store the value
            input.classList.remove('field-error');
        }
    }
    return true; // Return true if valid or empty
}

disconnectedCallback() {
    // Remove global event listeners
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    window.removeEventListener('resize', this.handleResize);

    // Remove event listeners and elements for dynamically created pages
    this.removeDynamicPage('#page4', this.handleStyleSelection, '.style-option');
    this.removeDynamicPage('#page5', this.handleDimensionInput, 'input[type="number"]');
    this.removeDynamicPage('#page6'); // No specific listeners for page6
    this.removeDynamicPage('#page7'); // No specific listeners for page7

    // Remove fullscreen buttons (no need for if statement since they are class properties)
    this.fullscreenBtn.remove();
    this.exitFullscreenBtn.remove();
}

// Helper function to remove a dynamic page and its listeners
removeDynamicPage(selector, eventHandler = null, subSelector = null) { // Default parameters
    const page = this.querySelector(selector);
    if (!page) return; // Return early if page not found

    if (eventHandler && subSelector) {
        page.querySelectorAll(subSelector).forEach(element => {
            element.removeEventListener('click', eventHandler); // Or appropriate event type
        });

        // Remove additional notes listener if on dimensions page
        if (selector === '#page5') {
            const notesInput = page.querySelector('#additional-notes');
            if (notesInput) {
                notesInput.removeEventListener('input', this.handleNotesInput);
            }
        }
    }
    page.remove(); // Remove the page element
}

async handleNextButtonClick() {
    try {
        const selectedRoomOption = this.currentPage === 3 ? this.querySelector('.room-option.selected') : null;
        const selectedRoom = selectedRoomOption?.dataset.room;

        switch (this.currentPage) {
            case 1: // Welcome Page
                this.showPage(2);
                break; // No need to set this.currentPage here, showPage() does it

            case 2: // Personal Information
                if (!this.validateRequiredFields('page2')) return;

                const emailField = this.querySelector("#Email");
                const phoneField = this.querySelector("#Phone");

                if (!this.validateEmail(emailField.value)) {
                    // ... (error handling)
                    return;
                }

                if (!this.validatePhoneNumber(phoneField.value)) {
                    // ... (error handling)
                    return;
                }

                this.showPage(3); // Proceed to Room Selection
                break; // Exit the switch case after handling page 2
     
case 3: // Room Selection
    console.log("Processing room selection");
    
    if (!selectedRoomOption) {
        this.showErrorPopup("Please select a room first.");
        return;
    }

    this.quoteData.Room = selectedRoom;
    console.log(`Room selected: ${selectedRoom}`);
    
    // For Other Spaces, we need to ensure proper page creation and navigation
    if (selectedRoom === 'Other Spaces') {
        console.log("Other Spaces selected - special handling");
        
        try {
            // First, ensure page 5 exists and is properly initialized
            await this.createDimensionsPage(selectedRoom);
            
            // Then explicitly navigate to page 5
            console.log("Navigating to dimensions page (page 5)");
            this.forceShowPage(5);
            
            // Double-check that we're on page 5
            setTimeout(() => {
                const activePage = this.querySelector('.form-page.active');
                console.log("Active page after navigation:", activePage ? activePage.id : "none");
                
                if (this.currentPage !== 5) {
                    console.error("Navigation to page 5 failed, current page:", this.currentPage);
                }
            }, 100);
        } catch (error) {
            console.error("Error handling Other Spaces selection:", error);
            this.showErrorPopup("An error occurred. Please try again.");
        }
    } else {
        // For other room types, proceed to style selection
        console.log("Standard room selected - rendering style selection page");
        await this.renderStyleSelectionPage(selectedRoom);
        this.showPage(4);
    }
    break;

            case 4: // Style Selection
                const selectedStyleOption = this.querySelector('.style-option.selected'); // Query for selectedStyleOption *here*
                if (!selectedStyleOption) {
                    this.showErrorPopup("Please select a style first.");
                    return;
                }
                this.quoteData.StyleSelection = selectedStyleOption.dataset.style;

                await this.renderDimensionsPage(this.quoteData.Room);
                this.showPage(5);
                this.currentPage = 5;
                break;

           case 5: // Dimensions
    console.log("Processing dimensions page");
    
    if (!this.collectDimensions()) {
        console.log("Dimension validation failed");
        return;
    }
    
    console.log("Dimensions collected successfully");
    
    try {
        // Create the review page
        await this.createReviewPage();
        
        // Force navigation to review page
        console.log("Navigating to review page (page 6)");
        this.forceShowPage(6);
    } catch (error) {
        console.error("Error navigating to review page:", error);
        this.showErrorPopup("Failed to load review page. Please try again.");
    }
    break;

        case 6: // Review
            this.submitQuote();
            return; // Don't increment currentPage here
       }
    } catch (error) {
        console.error("Error in handleNextButtonClick:", error);
        this.showErrorPopup("An error occurred. Please try again.");
    }
}

async createReviewPage() {
    console.log("Creating review page");
    
    try {
        const formBody = this.querySelector('.form-body');
        if (!formBody) {
            throw new Error("Form body not found");
        }
        
        // Remove any existing page 6
        const existingPage6 = this.querySelector('#page6');
        if (existingPage6) {
            console.log("Removing existing page 6");
            existingPage6.remove();
        }
        
        // Create a fresh page 6
        console.log("Creating new page 6");
        const page6 = document.createElement('div');
        page6.id = 'page6';
        page6.className = 'form-page';
        formBody.appendChild(page6);
        
        // Generate the review page content
        const dimensions = this.quoteData.dimensions || {};
        const additionalNotes = this.quoteData.additionalNotes;
        
        const hasDimensions = Object.entries(dimensions)
            .filter(([key]) => key !== 'roomName')
            .some(([key, value]) => value !== undefined && value !== '');
            
        let dimensionsHtml = "";
        if (this.quoteData.Room === 'Other Spaces') {
            dimensionsHtml = Object.entries(dimensions)
                .filter(([key]) => key !== 'roomName')
                .map(([key, value]) => `
                    <div class="review-item">
                        <span class="review-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span class="review-value">${value} inches</span>
                    </div>
                `)
                .join('');
        } else {
            dimensionsHtml = Object.entries(dimensions)
                .filter(([key]) => key !== 'roomName')
                .map(([key, value]) => `
                    <div class="review-item">
                        <span class="review-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span class="review-value">${value} inches</span>
                    </div>
                `)
                .join('');
        }
        
        const hasAdditionalNotes = !!additionalNotes;
        
        // Set the page content
        page6.innerHTML = this.getReviewPageTemplate(dimensionsHtml, hasDimensions, additionalNotes, hasAdditionalNotes);
        console.log("Page 6 content set");
        
        return page6;
    } catch (error) {
        console.error("Error creating review page:", error);
        throw error;
    }
}


async createDimensionsPage(roomType) {
    console.log(`Creating dimensions page for ${roomType}`);
    
    try {
        const formBody = this.querySelector('.form-body');
        if (!formBody) {
            throw new Error("Form body not found");
        }
        
        // Remove any existing page 5
        const existingPage5 = this.querySelector('#page5');
        if (existingPage5) {
            console.log("Removing existing page 5");
            existingPage5.remove();
        }
        
        // Create a fresh page 5
        console.log("Creating new page 5");
        const page5 = document.createElement('div');
        page5.id = 'page5';
        page5.className = 'form-page';
        formBody.appendChild(page5);
        this.page5 = page5;
        
        // Generate the appropriate template
        const template = roomType === 'Other Spaces' 
            ? this.getOtherSpacesDimensionsTemplate() 
            : this.getDimensionsTemplate();
            
        // Set the page content
        page5.innerHTML = this.getDimensionsPageTemplate(template);
        console.log("Page 5 content set");
        
        // Initialize event listeners
        this.initializeDimensionsListeners();
        console.log("Dimensions listeners initialized");
        
        return page5;
    } catch (error) {
        console.error("Error creating dimensions page:", error);
        throw error;
    }
}

// Add a method to force showing a page with extra checks
forceShowPage(pageNum) {
    console.log(`Force showing page ${pageNum}`);
    
    // Hide all pages first
    const allPages = this.querySelectorAll('.form-page');
    allPages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Show the target page
    const targetPage = this.querySelector(`#page${pageNum}`);
    if (!targetPage) {
        console.error(`Page ${pageNum} not found!`);
        return;
    }
    
    targetPage.classList.add('active');
    targetPage.style.display = 'block';
    console.log(`Page ${pageNum} (${targetPage.id}) activated`);
    
    // Update navigation buttons
    this.updateNavigationButtons(pageNum);
    
    // Update current page
    this.currentPage = pageNum;
    console.log(`Current page set to ${this.currentPage}`);
    
    // Save form data
    this.saveFormData();
    
    // Adjust height for mobile
    if (this.isMobile()) {
        this.adjustFormHeight();
    }
}

// Add a method to update navigation buttons
updateNavigationButtons(pageNum) {
    const beginButton = this.querySelector("#beginBtn");
    const prevButton = this.querySelector("#prevBtn");
    const nextButton = this.querySelector("#nextBtn");
    const startOverButton = this.querySelector("#startOverBtn");
    
    // Hide all buttons first
    beginButton.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    startOverButton.style.display = "none";
    
    // Show appropriate buttons based on page
    if (pageNum === 1) {
        beginButton.style.display = "block";
    } else if (pageNum === 7) {
        startOverButton.style.display = "block";
    } else {
        prevButton.style.display = "block";
        nextButton.style.display = "block";
        
        // Set submit button on review page
        if (pageNum === 6) {
            nextButton.textContent = "Submit";
            nextButton.style.backgroundColor = "var(--success-color)";
        } else {
            nextButton.textContent = "Next";
            nextButton.style.backgroundColor = "var(--primary-color)";
        }
    }
}

async submitQuote() {
    console.log(`Submitting quote, current page: ${this.currentPage}, Room: ${this.quoteData.Room}`);
    
    try {
        // CRITICAL CHECK: Only allow submission from the review page (page 6)
        if (this.currentPage !== 6) {
            console.error(`BLOCKED: Attempted to submit from incorrect page: ${this.currentPage}`);
            this.showErrorPopup("Please complete all steps before submitting.");
            return;
        }

        // Check if we're actually on page 6 visually
        const page6 = this.querySelector('#page6');
        const isPage6Active = page6 && page6.classList.contains('active');
        const isPage6Visible = page6 && window.getComputedStyle(page6).display !== 'none';
        
        if (!isPage6Active || !isPage6Visible) {
            console.error(`Page mismatch: currentPage=${this.currentPage} but page6 active=${isPage6Active}, visible=${isPage6Visible}`);
            this.showErrorPopup("Please complete all steps before submitting.");
            return;
        }

        // Additional validation for required data
        if (!this.validateSubmissionData()) {
            return;
        }

        // Set loading state
        this.setAttribute('submitting', '');
        const submitButton = this.querySelector("#nextBtn");
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        const formData = {
            personalInfo: {
                firstName: this.querySelector('#FirstName')?.value || '',
                lastName: this.querySelector('#LastName')?.value || '',
                email: this.querySelector('#Email')?.value || '',
                phone: this.querySelector('#Phone')?.value || '',
                address: {
                    line1: this.querySelector('#AddressLine1')?.value || '',
                    line2: this.querySelector('#AddressLine2')?.value || '',
                    city: this.querySelector('#City')?.value || '',
                    state: this.querySelector('#State')?.value || '',
                    zip: this.querySelector('#Zip')?.value || ''
                }
            },
            projectDetails: {
                roomType: this.quoteData.Room || '',
                style: this.quoteData.StyleSelection || '',
                dimensions: this.quoteData.dimensions || {},
                additionalNotes: this.quoteData.additionalNotes || ''
            }
        };

        console.log("Form data prepared for submission:", formData);

        // Create and dispatch the custom event
        const event = new CustomEvent('submitQuote', {
            detail: formData,
            bubbles: true,
            composed: true
        });
        
        console.log("Dispatching submitQuote event");
        const result = this.dispatchEvent(event);
        console.log("Event dispatch result:", result);
        
        // Note: dispatchEvent returns false if event.preventDefault() was called
        // It always returns true for custom events unless explicitly prevented
        if (result) {
            console.log("Submission successful, showing thank you page");
            
            // Use a more reliable way to show the thank you page
            this.forceNavigateToThankYouPage();
        } else {
            console.error("Submission prevented by event handler");
            throw new Error('Submission was prevented');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        this.showPopup('An error occurred while submitting the form. Please try again.');
    } finally {
        // Clean up loading state
        this.removeAttribute('submitting');
        const submitButton = this.querySelector("#nextBtn");
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Submit";
        }
    }
}

// Add this helper method to ensure reliable navigation to the thank you page
forceNavigateToThankYouPage() {
    console.log("Force navigating to thank you page");
    
    try {
        // Hide all pages
        const allPages = this.querySelectorAll('.form-page');
        allPages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });
        
        // Show thank you page
        const thankYouPage = this.querySelector('#page7');
        if (!thankYouPage) {
            throw new Error("Thank you page not found");
        }
        
        thankYouPage.classList.add('active');
        thankYouPage.style.display = 'block';
        
        // Update navigation buttons
        const beginButton = this.querySelector("#beginBtn");
        const prevButton = this.querySelector("#prevBtn");
        const nextButton = this.querySelector("#nextBtn");
        const startOverButton = this.querySelector("#startOverBtn");
        
        beginButton.style.display = "none";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        startOverButton.style.display = "block";
        
        // Update current page
        this.currentPage = 7;
        
        // Clear saved data
        this.clearSavedData();
        
        console.log("Successfully navigated to thank you page");
    } catch (error) {
        console.error("Error navigating to thank you page:", error);
        this.showErrorPopup("An error occurred. Please try again.");
    }
}

// Add this helper method to validate submission data
validateSubmissionData() {
    console.log("Validating submission data");
    
    // Check for required personal info
    const requiredFields = ['FirstName', 'LastName', 'Email', 'Phone', 'City', 'State', 'Zip'];
    for (const fieldId of requiredFields) {
        const field = this.querySelector(`#${fieldId}`);
        if (!field || !field.value.trim()) {
            console.error(`Missing required field: ${fieldId}`);
            this.showErrorPopup("Please complete all required personal information.");
            return false;
        }
    }
    
    // Check for room selection
    if (!this.quoteData.Room) {
        console.error("No room type selected");
        this.showErrorPopup("Please select a room type.");
        return false;
    }
    
    // Check for style selection (except for Other Spaces)
    if (this.quoteData.Room !== 'Other Spaces' && !this.quoteData.StyleSelection) {
        console.error("No style selected for non-Other Spaces room");
        this.showErrorPopup("Please select a style for your room.");
        return false;
    }
    
    console.log("Submission data validation passed");
    return true;
}

// Helper method to check if dimensions exist
hasDimensions(dimensions) {
    return Object.entries(dimensions)
        .filter(([key]) => key !== 'roomName')
        .some(([key, value]) => value !== undefined && value !== '');
}

// Helper method to generate dimensions HTML
generateDimensionsHtml(dimensions) {
    return Object.entries(dimensions)
        .filter(([key]) => key !== 'roomName')
        .map(([key, value]) => `
            <div class="review-item">
                <span class="review-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span class="review-value">${value} inches</span>
            </div>
        `)
        .join('');
}

// Add this validation method
validateAllFields() {
    switch (this.currentPage) {
        case 2: // Personal Information
            // Validate required fields, email, phone, and zip
            if (!this.validateRequiredFields('page2')) return false;
            if (!this.validateEmail(this.querySelector('#Email')?.value)) {
                this.querySelector('#Email')?.classList.add('field-error');
                this.showErrorPopup('Please enter a valid email address');
                return false;
            }
            // ... similar validation for phone and zip ...
            break; // Important: add break to prevent fallthrough

        case 3: // Room Selection
            if (!this.querySelector('.room-option.selected')) {
                this.showPopup('Please select a room type');
                return false;
            }
            break; // Add break here

        case 4: // Style Selection
            if (this.quoteData.Room !== 'Other Spaces' && !this.validateStyleSelection()) {
                // Only validate style selection if not "Other Spaces"
                return false; // validateStyleSelection already shows the popup
            }
            break; // Add break here

        case 5: // Dimensions
            if (!this.collectDimensions()) { // Call collectDimensions directly
                return false; // collectDimensions handles errors and returns false if invalid
            }
            break;

        // ... other cases if needed

        default: // No validation for other pages
            return true;
    }
    return true; // All validations passed for the current page
}

    resetForm() {
        this.quoteData = {};
        const inputs = this.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.value = '';
            input.setCustomValidity('');
            input.classList.remove('field-error', 'field-valid');
        });

        const selections = this.querySelectorAll('.room-option.selected, .style-option.selected');
        selections.forEach(el => el.classList.remove("selected"));
        
        this.clearSavedData();
        this.showPage(1);
    }
}

customElements.define("quote-form", QuoteForm);
