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

        // Create the fullscreen toggle button
        this.fullscreenBtn = this.createFullscreenButton();
        this.fullscreenBtn.id = 'fullscreenBtn';
        this.fullscreenBtn.textContent = 'Enter Fullscreen';

        // Initialize exitFullscreenBtn as a class property
        this.exitFullscreenBtn = this.createExitButton();
        this.exitFullscreenBtn.id = 'exitFullscreenBtn';
        this.exitFullscreenBtn.textContent = 'Exit Fullscreen';
        this.exitFullscreenBtn.style.display = 'none';

 // Bind removePreviousStyleSelection
    this.removePreviousStyleSelection = this.removePreviousStyleSelection.bind(this);

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
        // Store handler references with actual logic
        this.handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                this.classList.remove('fullscreen');
                this.exitFullscreenBtn.style.display = 'none';
                this.fullscreenBtn.style.display = 'block';
            } else {
                this.classList.add('fullscreen');
                this.exitFullscreenBtn.style.display = 'block';
                this.fullscreenBtn.style.display = 'none';
            }
        };

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
                link.href = "https://cdn.jsdelivr.net/gh/Paulenski205/gentry-wix@4779b0b1be255d1e31f5adf99fd89265323ca16e/wix-form-styles.css";
                link.onload = () => resolve();
                link.onerror = () => reject();
                document.head.appendChild(link);
            } else {
                resolve();
            }
        });

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
        btn.style.display = 'block';
        return btn;
    }

    createExitButton() {
        const btn = document.createElement('button');
        btn.id = 'exitFullscreenBtn';
        btn.textContent = 'Exit Fullscreen';
        btn.style.display = 'none';
        return btn;
    }

    async toggleFullscreen() {
        try {
            if (!document.fullscreenElement) {
                await this.requestFullscreen();
                this.classList.add('fullscreen');
                this.exitFullscreenBtn.style.display = 'block';
                this.fullscreenBtn.style.display = 'none';
            } else {
                await document.exitFullscreen();
                this.classList.remove('fullscreen');
                this.exitFullscreenBtn.style.display = 'none';
                this.fullscreenBtn.style.display = 'block';
            }
        } catch (err) {
            console.error('Error attempting to toggle fullscreen:', err);
        }
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
        const pages = this.querySelectorAll(".form-page");
        pages.forEach((pg, i) => {
            pg.classList.toggle("active", i === pageNum - 1);
        });
       
        
        const beginButton = this.querySelector("#beginBtn");
        const prevButton = this.querySelector("#prevBtn");
        const nextButton = this.querySelector("#nextBtn");
        const startOverButton = this.querySelector("#startOverBtn");
        
        if (pageNum === 1) {
            beginButton.style.display = "block";
            prevButton.style.display = "none";
            nextButton.style.display = "none";
        } else if (pageNum === 7) {
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

        if (pageNum > 1 && this.classList.contains('fullscreen')) {
            setTimeout(() => {
                this.querySelector('.form-body').scrollTo({ top: 0, behavior: 'smooth' });
            }, 0);
        }

        this.saveFormData();
 this.currentPage = pageNum;
if (this.isMobile()) {
    this.adjustFormHeight();
}
    }
	
	// Add these methods to your class:

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
        resolve();
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
    return new Promise((resolve, reject) => {
        const formBody = this.querySelector('.form-body');
        if (!formBody) {
            reject(new Error("Form body not found."));
            return;
        }

        let page5 = this.querySelector('#page5');
        if (!page5) {
            page5 = document.createElement('div');
            page5.id = 'page5';
            page5.className = 'form-page';
            formBody.appendChild(page5);
        }
try {
        const dimensionsTemplate = (selectedRoom === 'Other Spaces')
            ? this.getOtherSpacesDimensionsTemplate()
            : this.getDimensionsTemplate();

        page5.innerHTML = this.getDimensionsPageTemplate(dimensionsTemplate);
        this.initializeDimensionsListeners(page5);

        if (this.isMobile()) {
            this.adjustFormHeight();
        }
        resolve(); // Resolve after all operations are complete
    } catch (error) {
            reject(error); // Reject if any error occurs during setup
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
    return new Promise(resolve => {
        const formBody = this.querySelector('.form-body');
        if (!formBody) {
            console.error("Form body not found.");
            resolve(); // Resolve even if there's an error
            return;
        }


        let page6 = this.querySelector('#page6');
        if (!page6) {
            page6 = document.createElement('div');
            page6.id = 'page6';
            page6.className = 'form-page';
            formBody.appendChild(page6); // Append to formBody
        }

 let dimensionsHtml = "";
  let hasDimensions = false;

  const dimensions = this.quoteData.dimensions || {};

       // Check for ANY dimensions (excluding roomName for ALL room types)
        hasDimensions = Object.entries(dimensions)
            .filter(([key]) => key !== 'roomName') // Filter out roomName *before* checking
            .some(([key, value]) => value !== undefined && value !== ''); // Check for non-empty values

        if (this.quoteData.Room === 'Other Spaces') {
            dimensionsHtml = Object.entries(dimensions)
                .filter(([key]) => key !== 'roomName') // Exclude roomName from display
                .map(([key, value]) => `
                    <div class="review-item">
                        <span class="review-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span class="review-value">${value} inches</span>
                    </div>
                `)
                .join('');
        } else {
            // For other room types (use the same dimensionsHtml generation logic as above, excluding roomName)
            dimensionsHtml = Object.entries(dimensions)
                .filter(([key]) => key !== 'roomName') // Exclude roomName from display
                .map(([key, value]) => `
                    <div class="review-item">
                        <span class="review-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span class="review-value">${value} inches</span>
                    </div>
                `).join('');
        }

        // Get additional notes (if any)
        const additionalNotes = this.quoteData.additionalNotes;
        const hasAdditionalNotes = !!additionalNotes; // Check if additionalNotes is not empty

        page6.innerHTML = this.getReviewPageTemplate(dimensionsHtml, hasDimensions, additionalNotes, hasAdditionalNotes);

        if (this.isMobile()) {
            this.adjustFormHeight();
        }
        resolve();
    });
}

getReviewPageTemplate(dimensionsHtml, hasDimensions, additionalNotes, hasAdditionalNotes) {
let roomTypeDisplay = this.quoteData.Room || '';
    if (this.quoteData.Room === 'Other Spaces') {
        const dimensions = this.quoteData.dimensions || {};
        roomTypeDisplay = dimensions.roomName || 'Other Space'; // Access the *value* of roomName
    }

    // Conditionally render the dimensions section
    const dimensionsSection = hasDimensions ? `
        <div class="review-section">
            <h3>Room Dimensions</h3>
            <div class="review-grid dimensions-grid">
                ${dimensionsHtml}
            </div>
            ${hasAdditionalNotes ? `  </div> </div>
                <div class="review-item">
                    <span class="review-label">Additional Notes</span>
                    <span class="review-value">${additionalNotes}</span>
                </div>
            ` : ''}
        </div>
    ` : '';


    // Conditionally render Style Selection ONLY if it's set and not "Other Spaces"
    const styleSelectionSection = this.quoteData.StyleSelection && this.quoteData.Room !== 'Other Spaces' ? `
        <div class="review-item">
            <span class="review-label">Style Selection</span>
            <span class="review-value">${this.quoteData.StyleSelection}</span>
        </div>
    ` : '';

// Define and conditionally create additionalNotesSection *here*
    const additionalNotesSection = this.quoteData.additionalNotes ? `
        <div class="review-section">
            <h3>Additional Notes</h3>
            <div class="review-item">
                <span class="review-value">${this.quoteData.additionalNotes}</span>
            </div>
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
                            <span class="review-value">${roomTypeDisplay}</span>
                        </div>
                        ${styleSelectionSection}
                    </div>
                </div>

                ${dimensionsSection}
                ${additionalNotesSection}
            </div> </div> </div>  </div>  </div>
        </div>
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
        if (savedData) {
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

                    if (this.quoteData.additionalNotes) {
                        const notesInput = this.querySelector('#additional-notes');
                        if (notesInput) {
                            notesInput.value = this.quoteData.additionalNotes;
                        }
                    }
                }
            }
        }
    }

    clearSavedData() {
        localStorage.removeItem('formData');
        sessionStorage.clear();
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
    if (!page5) { // Check if page5 exists
        console.error('Dimensions page not found');
        return;
    }

    // Now you can use page5 within this method
    const dimensionInputs = page5.querySelectorAll('input[type="number"]');

    // Assign dimension input handler
    this.handleDimensionInput = (event) => {
        if (!this.quoteData.dimensions) {
            this.quoteData.dimensions = {};
        }
        this.quoteData.dimensions[event.target.id] = parseFloat(event.target.value);
        this.saveFormData();
    };

    dimensionInputs.forEach(input => {
        if (this.quoteData.dimensions && this.quoteData.dimensions[input.id]) {
            input.value = this.quoteData.dimensions[input.id];
        }

        input.addEventListener('input', this.handleDimensionInput); // Use the assigned handler
    });

    const notesInput = page5.querySelector('#additional-notes');
    this.handleNotesInput = (event) => {
        this.quoteData.additionalNotes = event.target.value; // Store additional notes in quoteData
        this.saveFormData();
    };

    if (this.quoteData.additionalNotes && notesInput) { // Check if notesInput exists
        notesInput.value = this.quoteData.additionalNotes;
    }
    
    if (notesInput) { // Check if notesInput exists before adding listener
        notesInput.addEventListener('input', this.handleNotesInput); // Use the assigned handler
    }
}

initializeDimensionsListeners() {
        if (!this.page5) { // Check if this.page5 exists
            console.error('Dimensions page not found');
            return;
        }

        // Use this.page5 to access the element
        const dimensionInputs = this.page5.querySelectorAll('input[type="number"]');
        // ... (rest of your listener logic)
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
        // Query for input elements *inside* the "Other Spaces" block
        const wallAInput = this.querySelector('#wallA');
        const wallBInput = this.querySelector('#wallB');
        const wallCInput = this.querySelector('#wallC');
        const wallDInput = this.querySelector('#wallD');
        const ceilingInput = this.querySelector('#ceiling');
        const roomNameInput = this.querySelector('#roomName'); // Or #roomName

        // Now you can use these variables in the validation logic below

        // Validate dimensions (optional fields)
        isValid = this.validateAndCollectDimension(wallAInput, 'wallA') && isValid;
        isValid = this.validateAndCollectDimension(wallBInput, 'wallB') && isValid;
        isValid = this.validateAndCollectDimension(wallCInput, 'wallC') && isValid;
        isValid = this.validateAndCollectDimension(wallDInput, 'wallD') && isValid;
        isValid = this.validateAndCollectDimension(ceilingInput, 'ceiling') && isValid;
        isValid = this.validateAndCollectDimension(roomNameInput, 'roomName') && isValid;

        // Get and store the custom location (even if empty)
        this.quoteData.dimensions.roomName = roomNameInput?.value || '';

        if (!isValid) {
            this.showErrorPopup("Please enter valid dimensions for Other Spaces. Values must be greater than zero if entered.");
            return false;
        }
    } else { // For other room types
        let isValidDimensions = true; // Track dimensions validity separately
        const inputs = this.querySelectorAll('#page5 input[type="number"]');

        inputs.forEach(input => {
            isValidDimensions = this.validateAndCollectDimension(input, input.id) && isValidDimensions;
        });

        if (!isValidDimensions) {
            this.showErrorPopup("Please enter valid dimensions. Values must be greater than zero if entered.");
            return false;
        }
    }

    // If all validations pass:
    this.saveFormData();
    return true;
}

showErrorPopup(message) {
    this.showPopup(message || 'An error occurred.');
}

disconnectedCallback() {
    // Remove global event listeners
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    window.removeEventListener('resize', this.handleResize);

    // Clean up dynamic page listeners
    const page4 = this.querySelector('#page4');
    if (page4) {
        page4.querySelectorAll('.style-option').forEach(element => {
            element.removeEventListener('click', this.handleStyleSelection);
        });
        page4.remove(); // Remove the page itself
    }

    const page5 = this.querySelector('#page5');
    if (page5) {
        page5.querySelectorAll('input[type="number"]').forEach(input => {
            input.removeEventListener('input', this.handleDimensionInput);
        });
        const notesInput = page5.querySelector('#additional-notes');
        if (notesInput) {
            notesInput.removeEventListener('input', this.handleNotesInput);
        }
        page5.remove(); // Remove the page itself
    }

// Remove dynamically added pages
    ['#page4', '#page5', '#page6', '#page7'].forEach(selector => {
        const page = this.querySelector(selector);
        if (page) page.remove();
    });

    // Clean up other form listeners (if used)
    // Make sure these handlers are defined and added elsewhere
    const inputs = this.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (this.handleInput) input.removeEventListener('input', this.handleInput);
        if (this.handleChange) input.removeEventListener('change', this.handleChange);
    });

    // Remove fullscreen and exit fullscreen buttons
    if (this.fullscreenBtn) this.fullscreenBtn.remove();
    if (this.exitFullscreenBtn) this.exitFullscreenBtn.remove();
}

    initializePopupListeners() {
        const overlay = this.querySelector('.popup-overlay');
        overlay.addEventListener('click', () => {
            this.querySelector('.custom-popup').style.display = 'none';
            overlay.style.display = 'none';
        });
    }

async handleNextButtonClick() {
    try {
// Get selectedRoomOption ONLY IF on the room selection page
        const selectedRoomOption = this.currentPage === 3 ? this.querySelector('.room-option.selected') : null;
        const selectedRoom = selectedRoomOption?.dataset.room; // Use optional chaining


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
                if (!selectedRoomOption) {
                    this.showErrorPopup("Please select a room first.");
                    return;
                }
                const selectedRoom = selectedRoomOption.dataset.room;

                if (selectedRoom === 'Other Spaces') {
                    await this.renderDimensionsPage(selectedRoom);
                    this.showPage(5);
                    this.currentPage = 5;
                } else {
                    await this.renderStyleSelectionPage(selectedRoom);
                    this.showPage(4);
                    this.currentPage = 4;
                }
                this.quoteData.Room = selectedRoom; // Set Room *after* showPage call
                break; // Add break to prevent fallthrough

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
                if (!this.collectDimensions()) return; // collectDimensions handles errors
                await this.renderReviewPage();
                this.showPage(6);
                this.currentPage = 6;
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

async submitQuote() {
    try {
        // Add validation check before submission
        if (!this.validateAllFields()) {
            this.showPopup('Please check all required fields before submitting');
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

        const event = new CustomEvent('submitQuote', {
            detail: formData,
            bubbles: true,
            composed: true
        });
        
        const result = await this.dispatchEvent(event);
        
        if (result) {
            this.showPage(7);
            this.clearSavedData(); // Clear saved data after successful submission
        } else {
            throw new Error('Submission failed');
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
