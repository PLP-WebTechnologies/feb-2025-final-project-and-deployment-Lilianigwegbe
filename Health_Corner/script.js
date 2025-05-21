/**
 * Health Blog - Main JavaScript File
 * Provides interactive functionality for the health blog
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components when the DOM is fully loaded
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeSearch();
    initializeBlogFeatures();
    initializeNewsletterSignup();
});

/**
 * Mobile Navigation Toggle
 */
function initializeNavigation() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref === 'blog.html' && currentPage.includes('post'))) {
            link.parentElement.classList.add('active');
        }
    });
}

/**
 * Scroll Effects
 */
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll animations for elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const checkVisibility = () => {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    };
    
    if (animatedElements.length > 0) {
        window.addEventListener('scroll', checkVisibility);
        // Initial check
        checkVisibility();
    }
}

/**
 * Contact Form Validation and Submission
 */
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea');
            
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else if (input.type === 'email' && input.value.trim()) {
                    // Simple email validation
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        isValid = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Form is valid - in a real application, you would submit it to a server
                const formStatus = document.createElement('div');
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                
                // Add the success message and remove the form
                contactForm.innerHTML = '';
                contactForm.appendChild(formStatus);
                
                // For demonstration only - in production, this would be handled by server-side code
                console.log('Form submitted successfully');
            } else {
                // Show general error message
                let formStatus = contactForm.querySelector('.form-status.error');
                
                if (!formStatus) {
                    formStatus = document.createElement('div');
                    formStatus.className = 'form-status error';
                    contactForm.prepend(formStatus);
                }
                
                formStatus.textContent = 'Please correct the errors in the form.';
            }
        });
        
        // Remove error class on input
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMessage = contactForm.querySelector('.form-status.error');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
}

/**
 * Search Functionality
 */
function initializeSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchResults = document.querySelector('.search-results');
    
    if (searchForm && searchResults) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                // In a real app, this would query a database or search API
                // For demo purposes, we'll just show a message
                searchResults.innerHTML = `<p>Showing results for "${searchTerm}"...</p>
                                        <p>In a real application, this would display actual search results.</p>`;
                searchResults.style.display = 'block';
            }
        });
    }
    
    // Search suggestions (simulated)
    const searchInput = document.querySelector('.search-form input[type="search"]');
    const suggestions = document.querySelector('.search-suggestions');
    
    if (searchInput && suggestions) {
        searchInput.addEventListener('input', function() {
            const term = this.value.trim().toLowerCase();
            
            if (term.length > 2) {
                // Demo suggestions only - would be replaced with actual data in production
                const demoTerms = ['nutrition', 'exercise', 'wellness', 'meditation', 'healthy recipes', 'mental health'];
                const matches = demoTerms.filter(item => item.includes(term));
                
                if (matches.length > 0) {
                    let html = '<ul>';
                    matches.forEach(match => {
                        html += `<li>${match}</li>`;
                    });
                    html += '</ul>';
                    
                    suggestions.innerHTML = html;
                    suggestions.style.display = 'block';
                    
                    // Add click event to suggestions
                    suggestions.querySelectorAll('li').forEach(item => {
                        item.addEventListener('click', function() {
                            searchInput.value = this.textContent;
                            suggestions.style.display = 'none';
                        });
                    });
                } else {
                    suggestions.style.display = 'none';
                }
            } else {
                suggestions.style.display = 'none';
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-form')) {
                suggestions.style.display = 'none';
            }
        });
    }
}

/**
 * Blog Features (comments, like/share, etc.)
 */
function initializeBlogFeatures() {
    // Comment form handling
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[name="name"]');
            const commentInput = this.querySelector('textarea[name="comment"]');
            
            if (nameInput && commentInput && nameInput.value.trim() && commentInput.value.trim()) {
                // Create a new comment element (in production, this would be handled server-side)
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <div class="comment-author">${nameInput.value.trim()}</div>
                    <div class="comment-date">Just now</div>
                    <div class="comment-content">${commentInput.value.trim()}</div>
                `;
                
                // Add the new comment to the comments list
                const commentsList = document.querySelector('.comments-list');
                if (commentsList) {
                    commentsList.appendChild(newComment);
                    
                    // Reset the form
                    nameInput.value = '';
                    commentInput.value = '';
                    
                    // Show confirmation message
                    const confirmationMsg = document.createElement('div');
                    confirmationMsg.className = 'comment-confirmation';
                    confirmationMsg.textContent = 'Your comment has been posted!';
                    commentForm.appendChild(confirmationMsg);
                    
                    // Remove confirmation after 3 seconds
                    setTimeout(() => {
                        confirmationMsg.remove();
                    }, 3000);
                }
            }
        });
    }
    
    // Like/Share functionality
    document.querySelectorAll('.like-button, .share-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('like-button')) {
                // Toggle like state
                this.classList.toggle('liked');
                const counter = this.querySelector('.like-count');
                if (counter) {
                    let count = parseInt(counter.textContent);
                    if (this.classList.contains('liked')) {
                        counter.textContent = count + 1;
                    } else {
                        counter.textContent = Math.max(0, count - 1);
                    }
                }
            } else if (this.classList.contains('share-button')) {
                // Open share dialog (simplified)
                alert('Share this post! In a real application, this would open social sharing options.');
            }
        });
    });
    
    // Related posts slider (if present)
    const relatedSlider = document.querySelector('.related-posts-slider');
    
    if (relatedSlider) {
        let currentSlide = 0;
        const slides = relatedSlider.querySelectorAll('.related-post');
        const maxSlides = slides.length;
        
        if (maxSlides > 0) {
            const nextBtn = relatedSlider.querySelector('.slider-next');
            const prevBtn = relatedSlider.querySelector('.slider-prev');
            
            // Show first slide
            slides[0].classList.add('active');
            
            if (nextBtn && prevBtn) {
                nextBtn.addEventListener('click', function() {
                    slides[currentSlide].classList.remove('active');
                    currentSlide = (currentSlide + 1) % maxSlides;
                    slides[currentSlide].classList.add('active');
                });
                
                prevBtn.addEventListener('click', function() {
                    slides[currentSlide].classList.remove('active');
                    currentSlide = (currentSlide - 1 + maxSlides) % maxSlides;
                    slides[currentSlide].classList.add('active');
                });
            }
        }
    }
}

/**
 * Newsletter Signup
 */
function initializeNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value.trim()) {
                // Validate email
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailPattern.test(emailInput.value.trim())) {
                    // Success state (in production, would send to server)
                    newsletterForm.innerHTML = '<p class="newsletter-success">Thank you for subscribing to our newsletter!</p>';
                } else {
                    // Show error
                    let errorMsg = newsletterForm.querySelector('.newsletter-error');
                    
                    if (!errorMsg) {
                        errorMsg = document.createElement('p');
                        errorMsg.className = 'newsletter-error';
                        newsletterForm.appendChild(errorMsg);
                    }
                    
                    errorMsg.textContent = 'Please enter a valid email address.';
                    emailInput.classList.add('error');
                }
            }
        });
    }
    
    // Exit intent popup for newsletter (shows when mouse leaves the window)
    const newsletterPopup = document.querySelector('.newsletter-popup');
    
    if (newsletterPopup) {
        // Only show once per session
        if (!sessionStorage.getItem('popup-shown')) {
            // Show popup when mouse leaves the window
            document.addEventListener('mouseleave', function(e) {
                if (e.clientY < 0) {
                    newsletterPopup.classList.add('active');
                    sessionStorage.setItem('popup-shown', 'true');
                }
            });
            
            // Close button
            const closeBtn = newsletterPopup.querySelector('.popup-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    newsletterPopup.classList.remove('active');
                });
            }
        }
    }
}

/**
 * Health Calculator (for BMI, calories, etc.)
 * Only initialize if the calculator exists on the page
 */
function initializeHealthCalculator() {
    const calculator = document.querySelector('.health-calculator');
    
    if (calculator) {
        const calculatorForm = calculator.querySelector('form');
        const resultDisplay = calculator.querySelector('.calculator-result');
        
        if (calculatorForm && resultDisplay) {
            calculatorForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(calculatorForm);
                const calculatorType = formData.get('calculator-type');
                
                if (calculatorType === 'bmi') {
                    // BMI calculation
                    const height = parseFloat(formData.get('height')) / 100; // cm to m
                    const weight = parseFloat(formData.get('weight'));
                    
                    if (height && weight) {
                        const bmi = weight / (height * height);
                        let category = '';
                        
                        if (bmi < 18.5) {
                            category = 'Underweight';
                        } else if (bmi < 25) {
                            category = 'Normal';
                        } else if (bmi < 30) {
                            category = 'Overweight';
                        } else {
                            category = 'Obese';
                        }
                        
                        resultDisplay.innerHTML = `
                            <h3>Your BMI Result</h3>
                            <p class="result-value">${bmi.toFixed(1)}</p>
                            <p class="result-category">${category}</p>
                            <p class="result-info">BMI is a screening tool and not a diagnostic tool. Consult with a healthcare provider for a proper assessment.</p>
                        `;
                        resultDisplay.style.display = 'block';
                    }
                } else if (calculatorType === 'calories') {
                    // Basic daily calorie calculation (Harris-Benedict equation)
                    const gender = formData.get('gender');
                    const age = parseInt(formData.get('age'));
                    const height = parseFloat(formData.get('height'));
                    const weight = parseFloat(formData.get('weight'));
                    const activity = parseFloat(formData.get('activity'));
                    
                    if (gender && age && height && weight && activity) {
                        let bmr = 0;
                        
                        // BMR calculation
                        if (gender === 'male') {
                            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
                        } else {
                            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
                        }
                        
                        // Total daily energy expenditure
                        const calories = bmr * activity;
                        
                        resultDisplay.innerHTML = `
                            <h3>Your Daily Calorie Needs</h3>
                            <p class="result-value">${Math.round(calories)} calories</p>
                            <p class="result-info">This is an estimate of how many calories you need daily to maintain your current weight.</p>
                        `;
                        resultDisplay.style.display = 'block';
                    }
                }
            });
        }
        
        // Reset button
        const resetBtn = calculator.querySelector('button[type="reset"]');
        if (resetBtn && resultDisplay) {
            resetBtn.addEventListener('click', function() {
                resultDisplay.style.display = 'none';
            });
        }
    }
}

// Add health calculator functionality (call this if you have a calculator on your pages)
// initializeHealthCalculator();

/**
 * Add to favorites functionality (using localStorage)
 */
document.querySelectorAll('.favorite-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const postId = this.dataset.postId;
        const postTitle = this.dataset.postTitle;
        
        if (postId && postTitle) {
            // Get existing favorites from localStorage
            let favorites = JSON.parse(localStorage.getItem('blog-favorites')) || [];
            
            // Check if already favorited
            const isFavorite = favorites.some(fav => fav.id === postId);
            
            if (isFavorite) {
                // Remove from favorites
                favorites = favorites.filter(fav => fav.id !== postId);
                this.classList.remove('favorited');
                this.setAttribute('title', 'Add to favorites');
            } else {
                // Add to favorites
                favorites.push({
                    id: postId,
                    title: postTitle,
                    url: window.location.pathname
                });
                this.classList.add('favorited');
                this.setAttribute('title', 'Remove from favorites');
            }
            
            // Update localStorage
            localStorage.setItem('blog-favorites', JSON.stringify(favorites));
            
            // Update UI indicator (if any)
            this.querySelector('.favorite-icon').textContent = isFavorite ? '☆' : '★';
        }
    });
    
    // Check if post is already in favorites on page load
    const postId = button.dataset.postId;
    if (postId) {
        const favorites = JSON.parse(localStorage.getItem('blog-favorites')) || [];
        const isFavorite = favorites.some(fav => fav.id === postId);
        
        if (isFavorite) {
            button.classList.add('favorited');
            button.setAttribute('title', 'Remove from favorites');
            const icon = button.querySelector('.favorite-icon');
            if (icon) {
                icon.textContent = '★';
            }
        }
    }
});

/**
 * Light/Dark Mode Toggle
 */
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('blog-theme');
        
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
            themeToggle.classList.add('active');
        }
        
        // Toggle theme on click
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.classList.toggle('active');
            
            // Save preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('blog-theme', 'dark');
            } else {
                localStorage.setItem('blog-theme', 'light');
            }
        });
    }
}

// Call theme toggle function
initializeThemeToggle();

/**
 * Reading Time Estimation
 */
function calculateReadingTime() {
    const articleContent = document.querySelector('.post-body, article');
    
    if (articleContent) {
        // Get all text content
        const text = articleContent.textContent;
        // Count words (simple estimation)
        const wordCount = text.split(/\s+/).length;
        // Average reading speed (words per minute)
        const wpm = 200;
        // Calculate reading time
        const readingTime = Math.ceil(wordCount / wpm);
        
        // Display reading time
        const readingTimeDisplay = document.querySelector('.reading-time');
        if (readingTimeDisplay) {
            readingTimeDisplay.textContent = `${readingTime} min read`;
        }
    }
}

// Calculate reading time for blog posts
calculateReadingTime();

/**
 * Table of Contents Generator
 */
function generateTableOfContents() {
    const articleContent = document.querySelector('.post-body, article');
    const tocContainer = document.querySelector('.table-of-contents');
    
    if (articleContent && tocContainer) {
        // Get all headings
        const headings = articleContent.querySelectorAll('h2, h3');
        
        if (headings.length > 2) { // Only show ToC if there are enough headings
            let tocHtml = '<ul>';
            
            headings.forEach((heading, index) => {
                // Add ID to heading if it doesn't have one
                if (!heading.id) {
                    heading.id = `section-${index}`;
                }
                
                const headingText = heading.textContent;
                const headingLevel = heading.tagName.toLowerCase();
                const headingId = heading.id;
                
                tocHtml += `<li class="${headingLevel}"><a href="#${headingId}">${headingText}</a></li>`;
            });
            
            tocHtml += '</ul>';
            tocContainer.innerHTML = tocHtml;
            tocContainer.style.display = 'block';
        }
    }
}

// Generate table of contents for blog posts
generateTableOfContents();