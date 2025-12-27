/**
 * INFINITE CAPITAL MANAGEMENT - MASTER JAVASCRIPT
 * Professional Website Interactive Components
 * Author: System Integration
 */

;(function() {
    'use strict';

    // Global variables
    let isLoading = true;
    let menuOpen = false;

    // Utility functions
    const Utils = {
        // Debounce function for performance
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function for scroll events
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        },

        // Format number with commas
        formatNumber: function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        // Smooth scroll to element
        smoothScrollTo: function(target, offset = 80) {
            const element = document.querySelector(target);
            if (element) {
                const elementPosition = element.offsetTop - offset;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        },

        // Add class with animation
        addClass: function(element, className) {
            if (element && !element.classList.contains(className)) {
                element.classList.add(className);
            }
        },

        // Remove class
        removeClass: function(element, className) {
            if (element && element.classList.contains(className)) {
                element.classList.remove(className);
            }
        },

        // Toggle class
        toggleClass: function(element, className) {
            if (element) {
                element.classList.toggle(className);
            }
        },

        // Check if element is in viewport
        isInViewport: function(element, offset = 100) {
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            return (
                rect.top < (window.innerHeight || document.documentElement.clientHeight) - offset &&
                rect.bottom > offset
            );
        }
    };

    // Mobile Navigation Handler
    class MobileNavigation {
        constructor() {
            this.hamburger = document.querySelector('.hamburger');
            this.navLinks = document.querySelector('.nav-links');
            this.navItems = document.querySelectorAll('.nav-links a');
            this.overlay = null;
            
            this.init();
        }

        init() {
            if (!this.hamburger || !this.navLinks) return;

            // Create overlay
            this.createOverlay();
            
            // Add event listeners
            this.hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMenu();
            });

            // Close menu when clicking on links
            this.navItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (menuOpen) {
                        this.closeMenu();
                    }
                });
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menuOpen) {
                    this.closeMenu();
                }
            });

            // Close menu on window resize if open
            window.addEventListener('resize', Utils.debounce(() => {
                if (window.innerWidth > 768 && menuOpen) {
                    this.closeMenu();
                }
            }, 250));
        }

        createOverlay() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'nav-overlay';
            this.overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 998;
            `;
            document.body.appendChild(this.overlay);

            this.overlay.addEventListener('click', () => {
                if (menuOpen) this.closeMenu();
            });
        }

        toggleMenu() {
            menuOpen ? this.closeMenu() : this.openMenu();
        }

        openMenu() {
            menuOpen = true;
            Utils.addClass(this.hamburger, 'active');
            Utils.addClass(this.navLinks, 'active');
            Utils.addClass(document.body, 'menu-open');
            
            // Show overlay
            if (this.overlay) {
                this.overlay.style.opacity = '1';
                this.overlay.style.visibility = 'visible';
            }

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        closeMenu() {
            menuOpen = false;
            Utils.removeClass(this.hamburger, 'active');
            Utils.removeClass(this.navLinks, 'active');
            Utils.removeClass(document.body, 'menu-open');
            
            // Hide overlay
            if (this.overlay) {
                this.overlay.style.opacity = '0';
                this.overlay.style.visibility = 'hidden';
            }

            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    // Carousel Class
    class InfiniteCarousel {
        constructor(container) {
            this.container = container;
            this.slides = Array.from(container.querySelectorAll('.carousel-slide'));
            this.dots = Array.from(container.querySelectorAll('.dot'));
            this.prevBtn = container.querySelector('.carousel-control.prev');
            this.nextBtn = container.querySelector('.carousel-control.next');
            this.currentIndex = 0;
            this.autoSlideInterval = null;
            this.autoSlideDelay = 5000; // 5 seconds
            this.isTransitioning = false;

            this.init();
        }

        init() {
            if (this.slides.length === 0) return;

            // Show first slide
            this.showSlide(this.currentIndex);

            // Add event listeners
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
            }

            // Add dot navigation
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            // Touch/swipe support
            this.addTouchSupport();

            // Auto slide
            this.startAutoSlide();

            // Pause on hover
            this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
            this.container.addEventListener('mouseleave', () => this.startAutoSlide());

            // Pause when page is not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.stopAutoSlide();
                } else {
                    this.startAutoSlide();
                }
            });
        }

        showSlide(index) {
            if (this.isTransitioning) return;
            this.isTransitioning = true;

            // Hide all slides
            this.slides.forEach((slide, i) => {
                Utils.removeClass(slide, 'active');
                if (i !== index) {
                    slide.style.display = 'none';
                }
            });

            // Deactivate all dots
            this.dots.forEach(dot => Utils.removeClass(dot, 'active'));

            // Show current slide with animation
            if (this.slides[index]) {
                this.slides[index].style.display = 'flex';
                // Force reflow
                this.slides[index].offsetHeight;
                Utils.addClass(this.slides[index], 'active');
            }

            // Activate current dot
            if (this.dots[index]) {
                Utils.addClass(this.dots[index], 'active');
            }

            // Reset transition lock after animation
            setTimeout(() => {
                this.isTransitioning = false;
            }, 800);
        }

        nextSlide() {
            if (this.isTransitioning) return;
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.showSlide(this.currentIndex);
        }

        prevSlide() {
            if (this.isTransitioning) return;
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.showSlide(this.currentIndex);
        }

        goToSlide(index) {
            if (this.isTransitioning || index < 0 || index >= this.slides.length) return;
            this.currentIndex = index;
            this.showSlide(this.currentIndex);
        }

        addTouchSupport() {
            let startX = 0;
            let startY = 0;
            let endX = 0;
            let endY = 0;
            let minSwipeDistance = 50;

            this.container.addEventListener('touchstart', (e) => {
                startX = e.changedTouches[0].screenX;
                startY = e.changedTouches[0].screenY;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].screenX;
                endY = e.changedTouches[0].screenY;
                this.handleSwipe(startX, startY, endX, endY, minSwipeDistance);
            }, { passive: true });
        }

        handleSwipe(startX, startY, endX, endY, minDistance) {
            const deltaX = endX - startX;
            const deltaY = endY - startY;

            // Ignore if vertical swipe is greater than horizontal
            if (Math.abs(deltaY) > Math.abs(deltaX)) return;

            if (Math.abs(deltaX) > minDistance) {
                if (deltaX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        }

        startAutoSlide() {
            this.stopAutoSlide();
            this.autoSlideInterval = setInterval(() => {
                if (!menuOpen && !document.hidden) {
                    this.nextSlide();
                }
            }, this.autoSlideDelay);
        }

        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        }
    }

    // Tabs Handler
    class TabsManager {
        constructor() {
            this.tabBtns = document.querySelectorAll('.tab-btn');
            this.tabPanes = document.querySelectorAll('.tab-pane');
            this.init();
        }

        init() {
            if (this.tabBtns.length === 0) return;

            this.tabBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchTab(btn);
                });

                // Add keyboard support
                btn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.switchTab(btn);
                    }
                });
            });
        }

        switchTab(activeBtn) {
            // Remove active class from all buttons and panes
            this.tabBtns.forEach(btn => Utils.removeClass(btn, 'active'));
            this.tabPanes.forEach(pane => Utils.removeClass(pane, 'active'));

            // Add active class to clicked button
            Utils.addClass(activeBtn, 'active');

            // Show corresponding tab content
            const tabId = activeBtn.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                Utils.addClass(targetPane, 'active');
                
                // Animate content
                targetPane.style.opacity = '0';
                targetPane.offsetHeight; // Force reflow
                targetPane.style.opacity = '1';
            }
        }
    }

    // Loan Calculator
    class LoanCalculator {
        constructor() {
            this.loanAmount = document.getElementById('loan-amount');
            this.interestRate = document.getElementById('interest-rate');
            this.loanTenure = document.getElementById('loan-tenure');
            this.loanAmountValue = document.getElementById('loan-amount-value');
            this.interestRateValue = document.getElementById('interest-rate-value');
            this.loanTenureValue = document.getElementById('loan-tenure-value');
            this.emiAmount = document.getElementById('emi-amount');

            this.init();
        }

        init() {
            // Check if calculator elements exist
            if (!this.loanAmount || !this.emiAmount) return;

            // Add event listeners
            if (this.loanAmount && this.loanAmountValue) {
                this.loanAmount.addEventListener('input', () => {
                    this.loanAmountValue.textContent = Utils.formatNumber(this.loanAmount.value);
                    this.calculateEMI();
                });
            }

            if (this.interestRate && this.interestRateValue) {
                this.interestRate.addEventListener('input', () => {
                    this.interestRateValue.textContent = this.interestRate.value;
                    this.calculateEMI();
                });
            }

            if (this.loanTenure && this.loanTenureValue) {
                this.loanTenure.addEventListener('input', () => {
                    this.loanTenureValue.textContent = this.loanTenure.value;
                    this.calculateEMI();
                });
            }

            // Initialize values and calculate
            this.initializeValues();
            this.calculateEMI();
        }

        initializeValues() {
            if (this.loanAmount && this.loanAmountValue) {
                this.loanAmountValue.textContent = Utils.formatNumber(this.loanAmount.value);
            }
            if (this.interestRate && this.interestRateValue) {
                this.interestRateValue.textContent = this.interestRate.value;
            }
            if (this.loanTenure && this.loanTenureValue) {
                this.loanTenureValue.textContent = this.loanTenure.value;
            }
        }

        calculateEMI() {
            if (!this.loanAmount || !this.interestRate || !this.loanTenure || !this.emiAmount) return;

            const principal = parseFloat(this.loanAmount.value);
            const rate = parseFloat(this.interestRate.value) / 12 / 100; // Monthly interest rate
            const time = parseFloat(this.loanTenure.value) * 12; // Convert years to months

            // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
            if (rate > 0 && time > 0) {
                const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
                this.emiAmount.textContent = Utils.formatNumber(emi.toFixed(0));
            } else {
                // If no interest, simple division
                this.emiAmount.textContent = Utils.formatNumber((principal / time).toFixed(0));
            }
        }
    }

    // Header Handler
    class HeaderManager {
        constructor() {
            this.header = document.querySelector('.header');
            this.lastScrollY = window.pageYOffset;
            this.scrollThreshold = 100;
            
            this.init();
        }

        init() {
            if (!this.header) return;

            // Throttled scroll handler
            window.addEventListener('scroll', Utils.throttle(() => {
                this.handleScroll();
            }, 16)); // ~60fps
        }

        handleScroll() {
            const currentScrollY = window.pageYOffset;
            
            if (currentScrollY > this.scrollThreshold) {
                this.header.style.background = 'rgba(255, 255, 255, 0.98)';
                this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                Utils.addClass(this.header, 'scrolled');
            } else {
                this.header.style.background = 'rgba(255, 255, 255, 0.98)';
                this.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
                Utils.removeClass(this.header, 'scrolled');
            }

            this.lastScrollY = currentScrollY;
        }
    }

    // Smooth Scroll Handler
    class SmoothScrollHandler {
        constructor() {
            this.init();
        }

        init() {
            // Handle all anchor links
            document.addEventListener('click', (e) => {
                const target = e.target.closest('a[href^="#"]');
                if (!target) return;

                const href = target.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    Utils.smoothScrollTo(href);
                    
                    // Close mobile menu if open
                    if (menuOpen) {
                        const mobileNav = new MobileNavigation();
                        mobileNav.closeMenu();
                    }
                }
            });
        }
    }

    // Animation Observer
    class AnimationObserver {
        constructor() {
            this.observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            this.init();
        }

        init() {
            // Only run if IntersectionObserver is supported
            if (!window.IntersectionObserver) return;

            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                this.observerOptions
            );

            // Observe elements that should animate
            const animationElements = document.querySelectorAll(
                '.loan-card, .financial-card, .testimonial-card, .feature-item, .trust-badge'
            );

            animationElements.forEach(el => {
                this.observer.observe(el);
            });
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Utils.addClass(entry.target, 'animate-fade-in');
                    // Unobserve after animation
                    this.observer.unobserve(entry.target);
                }
            });
        }
    }

    // Performance Monitor
    class PerformanceMonitor {
        constructor() {
            this.init();
        }

        init() {
            // Monitor loading performance
            window.addEventListener('load', () => {
                if (window.performance && window.performance.timing) {
                    const loadTime = window.performance.timing.loadEventEnd - 
                                   window.performance.timing.navigationStart;
                    
                    console.log(`Page load time: ${loadTime}ms`);
                    
                    // Optional: Send performance data to analytics
                    // this.sendPerformanceData(loadTime);
                }
            });

            // Monitor long tasks
            if ('PerformanceObserver' in window) {
                try {
                    const observer = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            if (entry.duration > 50) {
                                console.warn(`Long task detected: ${entry.duration}ms`);
                            }
                        }
                    });
                    observer.observe({entryTypes: ['longtask']});
                } catch (e) {
                    // PerformanceObserver not fully supported
                }
            }
        }
    }

    // Error Handler
    class ErrorHandler {
        constructor() {
            this.init();
        }

        init() {
            // Global error handling
            window.addEventListener('error', (e) => {
                console.error('JavaScript Error:', e.error);
                // Optional: Send error to logging service
                // this.reportError(e.error);
            });

            // Promise rejection handling
            window.addEventListener('unhandledrejection', (e) => {
                console.error('Unhandled Promise Rejection:', e.reason);
                // Optional: Send error to logging service
                // this.reportError(e.reason);
            });
        }
    }

    // Main Application Class
    class ICMWebsite {
        constructor() {
            this.components = [];
            this.isInitialized = false;
        }

        init() {
            if (this.isInitialized) return;

            try {
                // Initialize error handling first
                this.components.push(new ErrorHandler());
                
                // Initialize core components
                this.components.push(new MobileNavigation());
                this.components.push(new HeaderManager());
                this.components.push(new SmoothScrollHandler());
                
                // Initialize interactive components
                this.initializeCarousels();
                this.components.push(new TabsManager());
                this.components.push(new LoanCalculator());
                
                // Initialize enhancement components
                this.components.push(new AnimationObserver());
                this.components.push(new PerformanceMonitor());

                // Mark as initialized
                this.isInitialized = true;
                isLoading = false;

                // Add loaded class to body
                Utils.addClass(document.body, 'loaded');

                console.log('ICM Website initialized successfully');

            } catch (error) {
                console.error('Error initializing website:', error);
            }
        }

        initializeCarousels() {
            const carousels = document.querySelectorAll('.carousel-container');
            carousels.forEach(container => {
                this.components.push(new InfiniteCarousel(container));
            });
        }

        // Method to reinitialize if needed
        reinitialize() {
            this.isInitialized = false;
            this.components = [];
            this.init();
        }
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Create and initialize the main application
        window.ICMWebsite = new ICMWebsite();
        window.ICMWebsite.init();
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden - pause animations, carousels, etc.
            console.log('Page hidden - pausing activities');
        } else {
            // Page is visible - resume activities
            console.log('Page visible - resuming activities');
        }
    });

    // Export utilities for external use if needed
    window.ICMUtils = Utils;

})();
