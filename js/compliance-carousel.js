class ComplianceCarousel {
    constructor() {
        this.carousel = document.querySelector('.compliance-carousel-container');
        this.slides = document.querySelectorAll('.compliance-slide');
        this.dots = document.querySelectorAll('.compliance-dot');
        this.prevBtn = document.querySelector('.compliance-carousel-prev');
        this.nextBtn = document.querySelector('.compliance-carousel-next');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.slidesPerView = this.getSlidesPerView();
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        // Set initial slide positions
        this.updateSlides();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Add touch support
        this.addTouchSupport();
        
        // Start auto slide
        this.startAutoSlide();
        
        // Pause auto slide on hover
        const carouselContainer = document.querySelector('.compliance-carousel');
        carouselContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
        carouselContainer.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    getSlidesPerView() {
        if (window.innerWidth >= 992) return 3; // Desktop
        if (window.innerWidth >= 768) return 2; // Tablet
        return 1; // Mobile
    }
    
    updateSlides() {
        // Update slides per view on resize
        this.slidesPerView = this.getSlidesPerView();
        
        // Calculate the width for each slide
        const slideWidth = 100 / this.slidesPerView;
        
        // Set slide width
        this.slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}%`;
        });
        
        // Update carousel position
        this.goToSlide(this.currentIndex);
    }
    
    goToSlide(index) {
        // Handle wrap around for infinite effect
        if (index >= this.slideCount - this.slidesPerView + 1) {
            index = 0;
        } else if (index < 0) {
            index = this.slideCount - this.slidesPerView;
        }
        
        this.currentIndex = index;
        const slideWidth = 100 / this.slidesPerView;
        const offset = -this.currentIndex * slideWidth;
        
        this.carousel.style.transform = `translateX(${offset}%)`;
        
        // Update active dot
        this.updateDots();
        
        // Reset auto slide timer
        this.resetAutoSlide();
    }
    
    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    }
    
    updateDots() {
        const activeDotIndex = Math.floor(this.currentIndex / this.slidesPerView);
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }
    
    startAutoSlide() {
        // Only auto-slide if more than one slide
        if (this.slideCount <= this.slidesPerView) return;
        
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    
    handleResize() {
        this.updateSlides();
    }
    
    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', () => {
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        }, { passive: true });
    }
}

// Initialize the carousel when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ComplianceCarousel();
});
