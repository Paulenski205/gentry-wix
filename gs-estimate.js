class QuoteForm extends HTMLElement {
    constructor() {
        super();
this.attachShadow({ mode: 'open' });
        this.currentPage = 1;
        this.quoteData = {
            rooms: []  // Will store multiple room selections and their dimensions
        };
        this.totalPages = 4;
        this.isReady = false;
        
        // Create fullscreen buttons
        this.fullscreenBtn = this.createFullscreenButton();
        this.fullscreenBtn.id = 'fullscreenBtn';
        this.fullscreenBtn.textContent = 'Enter Fullscreen';

        this.exitFullscreenBtn = this.createExitButton();
        this.exitFullscreenBtn.id = 'exitFullscreenBtn';
        this.exitFullscreenBtn.textContent = 'Exit Fullscreen';
        this.exitFullscreenBtn.style.display = 'none';
    }

    isMobile() {
        return window.innerWidth <= 768;
    }

    adjustFormHeight() {
        if (this.isMobile()) {
            const formBody = this.shadowRoot.querySelector('.form-body');
            const activePage = this.shadowRoot.querySelector('.form-page.active');

            if (formBody && activePage) {
                formBody.style.height = 'auto';
                formBody.style.height = `${activePage.scrollHeight}px`;

                setTimeout(() => {
                    formBody.scrollTop = 0;
                }, 0);
            } else {
                console.error("Form body or active page not found.");
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
        
        // Before unload handler
        this.handleBeforeUnload = () => this.clearSavedData();
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        
        // Resize handler
        this.handleResize = () => {
            if (this.isMobile()) {
                this.adjustFormHeight();
            }
        };
        window.addEventListener('resize', this.handleResize);
    }

async connectedCallback() {
    // URLs for your hosted files
    const htmlUrl = "https://cdn.jsdelivr.net/gh/Paulenski205/gentry-wix@51f07c1abd6eb45b4b5ef865691aa591a56e7987/gs-estimate.html";
    const cssUrl = "https://cdn.jsdelivr.net/gh/Paulenski205/gentry-wix@0f2710ce328d3165b038e56de10c9410ac43c8b1/gs-estimate.css";

    try {
        console.log("Component connected. Fetching resources...");

        // 1. Fetch both the HTML and CSS files at the same time
        const [htmlResponse, cssResponse] = await Promise.all([
            fetch(htmlUrl),
            fetch(cssUrl)
        ]);

        // Check if the fetch requests were successful
        if (!htmlResponse.ok) throw new Error(`Failed to load HTML: ${htmlResponse.status}`);
        if (!cssResponse.ok) throw new Error(`Failed to load CSS: ${cssResponse.status}`);

        // Get the text content from the responses
        const htmlTemplate = await htmlResponse.text();
        let cssTemplate = await cssResponse.text();
        
        // Add Shadow DOM specific styles
        cssTemplate += `
            /* Shadow DOM specific styles */
            :host {
              display: block;
            }
            
            :host(.fullscreen) {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 9999;
            }
            
            :host(.fullscreen) .quote-form-container {
              width: 100vw !important;
              height: 100vh !important;
              margin: 0;
              padding: 0;
              border-radius: 0;
              background-color: var(--background-dark);
            }
            
            :host(.fullscreen) .form-body {
              height: calc(100vh - 60px);
              overflow-y: auto;
              padding: 20px;
            }
            
            :host(.fullscreen) .form-page {
              height: calc(100% - 40px);
            }
        `;

        // 2. Inject the CSS and HTML into the component's Shadow DOM
        this.shadowRoot.innerHTML = `<style>${cssTemplate}</style>${htmlTemplate}`;
        
        console.log("HTML and CSS have been loaded into the component's Shadow DOM.");

        // 3. Now that the HTML is loaded, find the form container
        const formContainer = this.shadowRoot.querySelector('.quote-form-container');
        if (formContainer) {
            // Append the fullscreen buttons as you did before
            formContainer.appendChild(this.fullscreenBtn);
            formContainer.appendChild(this.exitFullscreenBtn);
        } else {
            console.error("Form container not found inside the fetched HTML.");
        }

        // 4. Finally, initialize the form's functionality
        this.initializeForm();

    } catch (error) {
        console.error('Error initializing form:', error);
        this.shadowRoot.innerHTML = '<div>Error loading form. Please try again later.</div>';
    }
}

    initializeForm() {
 console.log("Shadow DOM content:", this.shadowRoot.innerHTML);
        const loadingState = this.shadowRoot.querySelector('.loading-state');
        const formContainer = this.shadowRoot.querySelector('.quote-form-container');

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
        } else {
            if (this.fullscreenBtn) this.fullscreenBtn.remove();
            if (this.exitFullscreenBtn) this.exitFullscreenBtn.remove();
        }

        this.setupGlobalEventListeners();
        this.initializeEventListeners();
        this.loadFormData();

        if (this.isMobile()) {
            this.adjustFormHeight();
        }
    }

    // Helper methods for button creation
    createFullscreenButton() {
        const btn = document.createElement('button');
        btn.id = 'fullscreenBtn';
        btn.textContent = 'Enter Fullscreen';
        btn.addEventListener('click', () => this.toggleFullscreen());
        return btn;
    }

    createExitButton() {
        const btn = document.createElement('button');
        btn.id = 'exitFullscreenBtn';
        btn.textContent = 'Exit Fullscreen';
        btn.addEventListener('click', () => document.exitFullscreen());
        btn.style.display = 'none';
        return btn;
    }

async toggleFullscreen() {
    try {
        if (!document.fullscreenElement) {
            // Request fullscreen on the container inside the shadow DOM instead of 'this'
            const container = this.shadowRoot.querySelector('.quote-form-container');
            if (container) {
                await container.requestFullscreen();
            } else {
                await this.requestFullscreen(); // Fallback
            }
        } else {
            document.exitFullscreen();
        }
    } catch (err) {
        console.error('Error attempting to toggle fullscreen:', err);
        this.showErrorPopup("An error occurred while toggling fullscreen mode. Please try again.");
    }
}

    // Validation Methods
    validateRequiredFields(pageId) {
        const inputs = this.shadowRoot.querySelectorAll(`#${pageId} [required]`);
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('field-error');
                isValid = false;
            } else {
                input.classList.remove('field-error');
            }
        });

        if (!isValid) {
            this.showPopup('Please fill out all required fields marked with *');
        }

        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length === 10;
    }

    validateRoomSelection() {
        const selectedRooms = this.shadowRoot.querySelectorAll('input[name="roomInterest"]:checked');
        if (selectedRooms.length === 0) {
            this.showPopup('Please select at least one room of interest');
            return false;
        }
        return true;
    }

    validateContactMethod() {
        const contactMethod = this.shadowRoot.querySelector('input[name="contactMethod"]:checked');
        if (!contactMethod) {
            this.showPopup('Please select your preferred contact method');
            return false;
        }
        
        // Check if the corresponding field is filled
        const method = contactMethod.value;
        if (method === 'phone') {
            const phone = this.shadowRoot.querySelector('#Phone').value;
            if (!this.validatePhoneNumber(phone)) {
                this.showPopup('Please enter a valid phone number');
                return false;
            }
        } else if (method === 'email') {
            const email = this.shadowRoot.querySelector('#Email').value;
            if (!this.validateEmail(email)) {
                this.showPopup('Please enter a valid email address');
                return false;
            }
        }
        
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

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // UI Interaction Methods
    showPopup(message) {
        const popup = this.shadowRoot.querySelector('.custom-popup');
        const overlay = this.shadowRoot.querySelector('.popup-overlay');
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

    showErrorPopup(message) {
        this.showPopup(message || 'An error occurred.');
    }

showPage(pageNum) {
    console.log(`Showing page ${pageNum}, current page was ${this.currentPage}`);
    
    // Validate page number
    if (pageNum < 1 || pageNum > this.totalPages) {
        console.error(`Invalid page number: ${pageNum}`);
        return;
    }
    
    // Update page visibility
    const pages = this.shadowRoot.querySelectorAll(".form-page");
    pages.forEach((pg, i) => {
        pg.classList.toggle("active", i === pageNum - 1);
    });
    
    // Update navigation buttons - with null checks
    const beginButton = this.shadowRoot.querySelector("#beginBtn");
    const prevButton = this.shadowRoot.querySelector("#prevBtn");
    const nextButton = this.shadowRoot.querySelector("#nextBtn");
    const startOverButton = this.shadowRoot.querySelector("#startOverBtn");
    
    if (pageNum === 1) {
        if (beginButton) beginButton.style.display = "block";
        if (prevButton) prevButton.style.display = "none";
        if (nextButton) nextButton.style.display = "none";
        if (startOverButton) startOverButton.style.display = "none";
    } else if (pageNum === this.totalPages) {
        if (beginButton) beginButton.style.display = "none";
        if (prevButton) prevButton.style.display = "none";
        if (nextButton) nextButton.style.display = "none";
        if (startOverButton) startOverButton.style.display = "block";
    } else {
        if (beginButton) beginButton.style.display = "none";
        if (prevButton) prevButton.style.display = "block";
        if (nextButton) nextButton.style.display = "block";
        if (startOverButton) startOverButton.style.display = "none";
        
        if (pageNum === 3 && nextButton) { // Room size selection page
            nextButton.textContent = "GET QUOTE";
            nextButton.style.backgroundColor = "var(--primary-color)";
        } else if (nextButton) {
            nextButton.textContent = "Next";
            nextButton.style.backgroundColor = "var(--primary-color)";
        }
    }

    // Scroll to top for better user experience
    if (pageNum > 1 && this.classList.contains('fullscreen')) {
        setTimeout(() => {
            const formBody = this.shadowRoot.querySelector('.form-body');
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
}

    // Form Data Handling Methods
    collectCustomerInfo() {
        const name = this.shadowRoot.querySelector('#Name').value;
        const phone = this.shadowRoot.querySelector('#Phone').value;
        const email = this.shadowRoot.querySelector('#Email').value;
        const contactMethod = this.shadowRoot.querySelector('input[name="contactMethod"]:checked')?.value;
        
        this.quoteData.customerInfo = {
            name,
            phone,
            email,
            contactMethod
        };

        // Collect room selections
        this.quoteData.rooms = [];
        const selectedRooms = this.shadowRoot.querySelectorAll('input[name="roomInterest"]:checked');
        selectedRooms.forEach(room => {
            let roomName = room.value;
            
            // If "Other" is selected, get the custom room name
            if (roomName === 'Other') {
                const otherRoomName = this.shadowRoot.querySelector('#otherRoomName').value;
                if (otherRoomName) {
                    roomName = otherRoomName;
                }
            }
            
            this.quoteData.rooms.push({
                name: roomName,
                length: 0,
                width: 0
            });
        });
    }

calculateEstimates() {
    // For now, just assign $1 to each room as a placeholder
    this.quoteData.rooms.forEach(room => {
        room.estimate = 1.00; // $1 placeholder
    });
    
    // Calculate total estimate
    this.quoteData.totalEstimate = this.quoteData.rooms.reduce((total, room) => total + room.estimate, 0);
}


    saveFormData() {
        localStorage.setItem('formData', JSON.stringify(this.quoteData));
    }

    loadFormData() {
        const savedData = localStorage.getItem('formData');
        if (!savedData) return;
        
        try {
            this.quoteData = JSON.parse(savedData);
            
            // Populate customer info fields
            if (this.quoteData.customerInfo) {
                this.shadowRoot.querySelector('#Name').value = this.quoteData.customerInfo.name || '';
                this.shadowRoot.querySelector('#Phone').value = this.quoteData.customerInfo.phone || '';
                this.shadowRoot.querySelector('#Email').value = this.quoteData.customerInfo.email || '';
                
                const contactMethod = this.quoteData.customerInfo.contactMethod;
                if (contactMethod) {
                    this.shadowRoot.querySelector(`input[name="contactMethod"][value="${contactMethod}"]`).checked = true;
                }
            }
            
            // Populate room selections
            if (this.quoteData.rooms && this.quoteData.rooms.length > 0) {
                this.quoteData.rooms.forEach(room => {
                    // Check standard room options
                    const standardRooms = ['Kitchen', 'Bathroom', 'Closet'];
                    if (standardRooms.includes(room.name)) {
                        this.shadowRoot.querySelector(`input[name="roomInterest"][value="${room.name}"]`).checked = true;
                    } else {
                        // Handle "Other" room
                        this.shadowRoot.querySelector('input[name="roomInterest"][value="Other"]').checked = true;
                        this.shadowRoot.querySelector('#otherRoomName').value = room.name;
                        this.shadowRoot.querySelector('#otherRoomContainer').style.display = 'block';
                    }
                });
                
                // If we're on the dimensions page, populate those fields
                if (this.currentPage === 3) {
                    this.renderRoomDimensionsPage();
                }
            }
        } catch (error) {
            console.error('Error loading saved form data:', error);
            // Clear potentially corrupted data
            this.clearSavedData();
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
        this.initializePopupListeners();
    }

initializeButtonListeners() {
    // Begin button - use a more direct approach
    setTimeout(() => {
        const beginButton = this.shadowRoot.querySelector("#beginBtn");
        console.log("Begin button (after delay):", beginButton);
        
        if (beginButton) {
            // Use direct onclick property instead of addEventListener
            beginButton.onclick = () => {
                console.log("Begin button clicked via onclick property!");
                this.showPage(2);
            };
        } else {
            console.error("Begin button still not found after delay");
        }
    }, 100); // Small delay to ensure DOM is ready

    // Previous button
    const prevButton = this.shadowRoot.querySelector("#prevBtn");
    if (prevButton) {
        prevButton.onclick = () => {
            console.log("Previous button clicked");
            this.showPage(this.currentPage - 1);
        };
    }

    // Next button
    const nextButton = this.shadowRoot.querySelector("#nextBtn");
    if (nextButton) {
        nextButton.onclick = () => {
            console.log("Next button clicked");
            this.handleNextButtonClick();
        };
    }

    // Reset form button
    const resetFormBtn = this.shadowRoot.querySelector("#resetFormBtn");
    if (resetFormBtn) {
        resetFormBtn.onclick = () => {
            if (confirm("Are you sure you want to reset the form? All entered data will be lost.")) {
                this.resetForm();
            }
        };
    }

    // Start over button
    const startOverBtn = this.shadowRoot.querySelector("#startOverBtn");
    if (startOverBtn) {
        startOverBtn.onclick = () => {
            this.resetForm();
            this.showPage(1);
        };
    }
}

    initializeInputListeners() {
        // Phone number formatting
        const phoneInput = this.shadowRoot.querySelector('#Phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                const unformatted = e.target.value.replace(/\D/g, '');
                const formatted = this.formatPhoneNumber(unformatted);
                e.target.value = formatted;
            });
        }

        // Room interest "Other" field toggle
        const otherRoomCheckbox = this.shadowRoot.querySelector('input[name="roomInterest"][value="Other"]');
        const otherRoomContainer = this.shadowRoot.querySelector('#otherRoomContainer');
        
        if (otherRoomCheckbox && otherRoomContainer) {
            otherRoomCheckbox.addEventListener('change', () => {
                otherRoomContainer.style.display = otherRoomCheckbox.checked ? 'block' : 'none';
            });
        }

        // Contact method radio buttons
        const contactMethodRadios = this.shadowRoot.querySelectorAll('input[name="contactMethod"]');
        const phoneField = this.shadowRoot.querySelector('#Phone');
        const emailField = this.shadowRoot.querySelector('#Email');
        
        contactMethodRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'phone') {
                    phoneField.setAttribute('required', '');
                    emailField.removeAttribute('required');
                } else if (radio.value === 'email') {
                    emailField.setAttribute('required', '');
                    phoneField.removeAttribute('required');
                }
            });
        });
    }

    initializePopupListeners() {
        const popup = this.shadowRoot.querySelector('.custom-popup');
        const overlay = this.shadowRoot.querySelector('.popup-overlay');
        const closeBtn = popup.querySelector('.popup-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.style.display = 'none';
                overlay.style.display = 'none';
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                popup.style.display = 'none';
                overlay.style.display = 'none';
            });
        }
    }

handleNextButtonClick() {
    switch (this.currentPage) {
        case 1: // Welcome Page
            this.showPage(2);
            break;

        case 2: // Customer Information
            if (!this.validateRequiredFields('page2')) return;
            if (!this.validateContactMethod()) return;
            if (!this.validateRoomSelection()) return;
            
            this.collectCustomerInfo();
            this.renderRoomDimensionsPage();
            this.showPage(3);
            break;

        case 3: // Room Size Selection
            if (!this.validateSizeSelection()) return;
            
            this.calculateEstimates();
            this.submitQuote(); // This will show the thank you page
            break;
    }
}

validateSizeSelection() {
    let isValid = true;
    
    this.quoteData.rooms.forEach((room, index) => {
        if (room.selectedSizeIndex === undefined) {
            isValid = false;
            // Highlight the section that needs attention
            const roomSection = this.shadowRoot.querySelector(`.room-dimension-section:nth-child(${index + 1})`);
            if (roomSection) {
                roomSection.classList.add('field-error');
            }
        }
    });
    
    if (!isValid) {
        this.showPopup('Please select a size for each room');
    }
    
    return isValid;
}


renderRoomDimensionsPage() {
    const dimensionsContainer = this.shadowRoot.querySelector('#roomDimensionsContainer');
    if (!dimensionsContainer) return;
    
    // Clear previous content
    dimensionsContainer.innerHTML = '';
    
    // Define size options for each room type
    const roomSizeOptions = {
        Kitchen: [
            { label: 'Small', width: 10, length: 10 },
            { label: 'Average', width: 12, length: 12 },
            { label: 'Large', width: 12, length: 15 }
        ],
        Bathroom: [
            { label: 'Small', width: 6, length: 6 },
            { label: 'Average', width: 8, length: 8 },
            { label: 'Large', width: 10, length: 10 }
        ],
        Closet: [
            { label: 'Small', width: 6, length: 6 },
            { label: 'Average', width: 6, length: 8 },
            { label: 'Large', width: 8, length: 10 }
        ]
    };
    
    // Create sections for each selected room
    this.quoteData.rooms.forEach((room, index) => {
        // Get the appropriate size options for this room type
        const roomSizeChoices = roomSizeOptions[room.name] || [  // Changed variable name here
            { label: 'Small', width: 6, length: 6 },
            { label: 'Average', width: 8, length: 8 },
            { label: 'Large', width: 10, length: 10 }
        ];
        
        const section = document.createElement('div');
        section.className = 'room-dimension-section';
        
        // Create the section header
        let sectionHTML = `<h3>${room.name}</h3>`;
        sectionHTML += `<p>Please select the approximate size of your ${room.name.toLowerCase()}:</p>`;
        
        // Create the size options
        sectionHTML += `<div class="room-size-options" data-room-index="${index}">`;
        
        roomSizeChoices.forEach((option, optionIndex) => {  // Use the new variable name here
            const isSelected = room.selectedSizeIndex === optionIndex;
            sectionHTML += `
                <div class="room-size-option ${isSelected ? 'selected' : ''}" data-option-index="${optionIndex}" data-width="${option.width}" data-length="${option.length}">
                    <div class="size-option-content">
                        <span class="size-label">${option.label}</span>
                        <span class="size-dimensions">${option.width}' × ${option.length}'</span>
                    </div>
                </div>
            `;
        });
        
        sectionHTML += `</div>`;
        section.innerHTML = sectionHTML;
        dimensionsContainer.appendChild(section);
        
        // Add event listeners to the size options
        const sizeOptionElements = section.querySelectorAll('.room-size-option');  // Changed variable name here
        sizeOptionElements.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options in this section
                sizeOptionElements.forEach(opt => opt.classList.remove('selected'));  // Use the new variable name here
                
                // Add selected class to clicked option
                option.classList.add('selected');
                
                // Update the room data
                const roomIndex = parseInt(option.parentElement.dataset.roomIndex);
                const optionIndex = parseInt(option.dataset.optionIndex);
                const width = parseFloat(option.dataset.width);
                const length = parseFloat(option.dataset.length);
                
                this.quoteData.rooms[roomIndex].selectedSizeIndex = optionIndex;
                this.quoteData.rooms[roomIndex].width = width;
                this.quoteData.rooms[roomIndex].length = length;
                
                // Save the updated data
                this.saveFormData();
            });
        });
    });
    
    // Update the Next button text
    const nextButton = this.shadowRoot.querySelector("#nextBtn");
    if (nextButton) {
        nextButton.textContent = "GET QUOTE";
    }
}

    renderEstimatePage() {
    const estimateContainer = this.shadowRoot.querySelector('#estimateContainer');
    if (!estimateContainer) return;
    
    // Clear previous content
    estimateContainer.innerHTML = '';
    
    // Create a flex grid container for the estimates
    let estimateHtml = `
        <div class="estimate-intro">
            <p>Based on your measurements, we've calculated the following estimates:</p>
        </div>
        <div class="estimate-grid">
    `;
    
    // Add each room as a grid item
    this.quoteData.rooms.forEach(room => {
        estimateHtml += `
            <div class="estimate-card">
                <div class="estimate-card-header">
                    <h3>${room.name}</h3>
                </div>
                <div class="estimate-card-body">
                    <div class="estimate-detail">
                        <span class="detail-label">Dimensions:</span>
                        <span class="detail-value">${room.length}' × ${room.width}'</span>
                    </div>
                    <div class="estimate-detail">
                        <span class="detail-label">Linear Feet:</span>
                        <span class="detail-value">${(room.length + room.width).toFixed(1)}'</span>
                    </div>
                    <div class="estimate-amount">
                        <span class="detail-label">Estimate:</span>
                        <span class="detail-value price">${this.formatCurrency(room.estimate)}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Close the grid and add the total estimate
    estimateHtml += `
        </div>
        <div class="estimate-total-container">
            <div class="estimate-total">
                <span class="total-label">Total Estimate:</span>
                <span class="total-amount">${this.formatCurrency(this.quoteData.totalEstimate)}</span>
            </div>
        </div>
    `;
    
    estimateContainer.innerHTML = estimateHtml;
}

    renderReviewPage() {
        const reviewContainer = this.shadowRoot.querySelector('#reviewContainer');
        if (!reviewContainer) return;
        
        // Customer information section
        const customerInfo = this.quoteData.customerInfo;
        const customerSection = document.createElement('div');
        customerSection.className = 'review-section';
        customerSection.innerHTML = `
            <h3>Customer Information</h3>
            <div class="review-grid personal-info-grid">
                <div class="review-item">
                    <span class="review-label">Name</span>
                    <span class="review-value">${customerInfo.name || ''}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Phone</span>
                    <span class="review-value">${customerInfo.phone || ''}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Email</span>
                    <span class="review-value">${customerInfo.email || ''}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Preferred Contact</span>
                    <span class="review-value">${customerInfo.contactMethod || ''}</span>
                </div>
            </div>
        `;
        
        // Rooms and estimates section
        const roomsSection = document.createElement('div');
        roomsSection.className = 'review-section';
        roomsSection.innerHTML = `<h3>Room Estimates</h3>`;
        
        const roomsGrid = document.createElement('div');
        roomsGrid.className = 'review-grid rooms-grid';
        
        this.quoteData.rooms.forEach(room => {
            const roomItem = document.createElement('div');
            roomItem.className = 'review-item room-estimate';
            roomItem.innerHTML = `
                <span class="review-label">${room.name}</span>
                <span class="review-value">
                    Dimensions: ${room.length}' × ${room.width}'<br>
                    Estimate: ${this.formatCurrency(room.estimate)}
                </span>
            `;
            roomsGrid.appendChild(roomItem);
        });
        
        // Total estimate
        const totalItem = document.createElement('div');
        totalItem.className = 'review-item total-estimate';
        totalItem.innerHTML = `
            <span class="review-label">Total Estimate</span>
            <span class="review-value">${this.formatCurrency(this.quoteData.totalEstimate)}</span>
        `;
        roomsGrid.appendChild(totalItem);
        
        roomsSection.appendChild(roomsGrid);
        
        // Clear and append all sections
        reviewContainer.innerHTML = '';
        reviewContainer.appendChild(customerSection);
        reviewContainer.appendChild(roomsSection);
    }

 async submitQuote() {
    try {
        // Set loading state
        this.setAttribute('submitting', '');
        const submitButton = this.shadowRoot.querySelector("#nextBtn");
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        // Prepare form data for submission
        const formData = {
            customerInfo: this.quoteData.customerInfo,
            rooms: this.quoteData.rooms,
            totalEstimate: this.quoteData.totalEstimate,
            submissionDate: new Date().toISOString()
        };

        // Create and dispatch the custom event
        const event = new CustomEvent('submitQuote', {
            detail: formData,
            bubbles: true,
            composed: true
        });
        
        console.log("Dispatching submitQuote event");
        const result = this.dispatchEvent(event);
        
        if (result) {
            console.log("Submission successful, showing thank you page");
            
            // Render the thank you page with estimates
            this.renderThankYouWithEstimates();
            
            // Show the thank you page
            this.showPage(4); // Now page 4 is the thank you page
            this.clearSavedData();
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
        const submitButton = this.shadowRoot.querySelector("#nextBtn");
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "GET QUOTE";
        }
    }
}

// 1. Replace this method to fix the layout of the estimate cards
renderThankYouWithEstimates() {
    const thankYouPage = this.shadowRoot.querySelector('#page4');
    if (!thankYouPage) return;

    let html = `
        <div class="thank-you-content">
            <h2>Thank You!</h2>
            <p>Thank you for your interest. We will reach out to you shortly for more information.</p>
            
            <div class="estimate-summary">
                <h3>Your Estimate Summary</h3>
                <div class="estimate-grid">
    `;
    
    // Add each room estimate with the corrected structure
    this.quoteData.rooms.forEach(room => {
        html += `
            <div class="estimate-card">
                <div class="estimate-card-header">
                    <h3>${room.name}</h3>
                </div>
                <div class="estimate-card-body">
                    <div class="estimate-detail">
                        <span class="detail-label">Size:</span>
                        <span class="detail-value">${room.length}' × ${room.width}'</span>
                    </div>
                    <div class="estimate-price">
                        <span class="detail-value price">${this.formatCurrency(room.estimate)}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Add total and contact info
    html += `
                </div>
                <div class="estimate-total-container">
                    <div class="estimate-total">
                        <span class="total-label">Total Estimate:</span>
                        <span class="total-amount">${this.formatCurrency(this.quoteData.totalEstimate)}</span>
                    </div>
                </div>
            </div>
            
            <p class="contact-note">We'll contact you via ${this.quoteData.customerInfo.contactMethod} to discuss your project.</p>
            
            <button id="startOverBtn" class="nav-button">Start Over</button>
        </div>
    `;
    
    thankYouPage.innerHTML = html;
    
    // Re-attach event listener to the start over button
    const startOverBtn = thankYouPage.querySelector('#startOverBtn');
    if (startOverBtn) {
        startOverBtn.style.display = 'inline-block'; // Make sure it's visible
        startOverBtn.addEventListener('click', () => {
            this.resetForm();
            this.showPage(1);
        });
    }
}

// 2. Replace this method to fix the "white box" around the button
showPage(pageNum) {
    console.log(`Showing page ${pageNum}, current page was ${this.currentPage}`);
    
    if (pageNum < 1 || pageNum > this.totalPages) {
        console.error(`Invalid page number: ${pageNum}`);
        return;
    }
    
    const pages = this.shadowRoot.querySelectorAll(".form-page");
    pages.forEach((pg, i) => {
        pg.classList.toggle("active", i === pageNum - 1);
    });
    
    const formNav = this.shadowRoot.querySelector(".form-nav");
    const beginButton = this.shadowRoot.querySelector("#beginBtn");
    const prevButton = this.shadowRoot.querySelector("#prevBtn");
    const nextButton = this.shadowRoot.querySelector("#nextBtn");

    // This is the key change to hide the entire bottom nav bar on the final page
    if (pageNum === this.totalPages) { // Thank You Page
        if (formNav) formNav.style.display = "none";
    } else {
        if (formNav) formNav.style.display = "flex";
        
        if (pageNum === 1) { // Welcome Page
            if (beginButton) beginButton.style.display = "block";
            if (prevButton) prevButton.style.display = "none";
            if (nextButton) nextButton.style.display = "none";
        } else { // All other pages (2 and 3)
            if (beginButton) beginButton.style.display = "none";
            if (prevButton) prevButton.style.display = "block";
            if (nextButton) nextButton.style.display = "block";
            
            if (pageNum === 3) { // Room Size Selection Page
                nextButton.textContent = "GET QUOTE";
                nextButton.style.backgroundColor = "var(--primary-color)";
            } else {
                nextButton.textContent = "Next";
                nextButton.style.backgroundColor = "var(--primary-color)";
            }
        }
    }

    if (pageNum > 1 && this.classList.contains('fullscreen')) {
        setTimeout(() => {
            const formBody = this.shadowRoot.querySelector('.form-body');
            if (formBody) formBody.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    }

    this.saveFormData();
    this.currentPage = pageNum;
    
    if (this.isMobile()) {
        this.adjustFormHeight();
    }
}

    resetForm() {
        this.quoteData = {
            rooms: []
        };
        
        const inputs = this.shadowRoot.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
            input.classList.remove('field-error', 'field-valid');
        });
        
        // Hide the "Other" room input
        const otherRoomContainer = this.shadowRoot.querySelector('#otherRoomContainer');
        if (otherRoomContainer) {
            otherRoomContainer.style.display = 'none';
        }
        
        this.clearSavedData();
        this.showPage(1);
    }

    disconnectedCallback() {
        // Remove global event listeners
        document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        window.removeEventListener('resize', this.handleResize);
        
        // Remove fullscreen buttons
        if (this.fullscreenBtn) this.fullscreenBtn.remove();
        if (this.exitFullscreenBtn) this.exitFullscreenBtn.remove();
    }
}

customElements.define("quote-form", QuoteForm);
